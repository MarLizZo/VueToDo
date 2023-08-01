<script setup lang="ts">
import HeaderComp from '../components/Header.vue';
import FooterComp from '../components/Footer.vue';
import FormComp from '../components/Form.vue';
import LoaderComp from '../components/Loader.vue';
import { onBeforeUpdate, onMounted, ref, type Ref } from 'vue';
import { type ITask } from '@/interfaces/ITask';
import { StorageHelper as sh } from '@/modules/StorageHelper';

const isLoading = ref(true);
const tasksArray: Ref<ITask[]> = ref([]);

function sortArray(arr: ITask[]): void {
    let urgentArr: ITask[] = arr.filter(t => t.urgent);
    let notUrgentArr: ITask[] = arr.filter(t => !t.urgent);
    tasksArray.value.splice(0, tasksArray.value.length);
    tasksArray.value.push(...urgentArr, ...notUrgentArr);
}

onMounted(() => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
    sortArray(sh.getInProgressTasks());
});

onBeforeUpdate(() => {
    if (tasksArray.value.length) sh.saveToStorage(tasksArray.value);
});

function addTask(task: ITask) {
    if (task.urgent) {
        tasksArray.value.unshift(task);
    } else {
        tasksArray.value.splice(tasksArray.value.findIndex(el => !el.urgent), 0, task);
    }
    sortArray(tasksArray.value);
}

function switchUrgency(task: ITask) {
    let index = tasksArray.value.findIndex(t => t == task);
    tasksArray.value[index].urgent = !tasksArray.value[index].urgent;
    sortArray(tasksArray.value);
}

function markCompleted(task: ITask) {
    let index = tasksArray.value.findIndex(t => t == task);
    tasksArray.value[index].in_progress = false;
    sh.saveToStorage(tasksArray.value);
    sortArray(sh.getInProgressTasks());
}
</script>

<template>
    <header class="d-flex justify-content-center">
        <HeaderComp />
    </header>
    <main class="flex-grow-1">
        <div v-if="!isLoading" class="container-fluid my-4 d-flex flex-column">
            <FormComp @submit="addTask" />
            <div v-if="!tasksArray.length" class="d-flex flex-grow-1 justify-content-center align-items-center">
                <h3 class="m-0">No Tasks found. It's time to get to work!</h3>
            </div>
            <div v-if="tasksArray.length" class="mt-5 mb-3 d-flex flex-column align-items-center">
                <div v-for="task of tasksArray" class="single-task">
                    <div
                        class="d-flex align-items-center justify-content-between px-3 py-2 my-3 border border-1 border-green rounded-5">
                        <div class="d-flex align-items-center">
                            <i v-if="task.urgent" class="bi bi-exclamation-circle-fill urgent-badge me-2"></i>
                            <p class="m-0">{{ task.content }}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="bi bi-check-circle-fill mark-completed" @click="markCompleted(task)"></i>
                            <i class="bi bi-pencil-square mx-2 edit-icon"></i>
                            <i class="bi bi-bookmark-fill mark-urgency" @click="switchUrgency(task)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="h-100 d-flex align-items-center justify-content-center">
            <LoaderComp />
        </div>
    </main>
    <footer class="d-flex justify-content-center">
        <FooterComp />
    </footer>
</template>

<style scoped>
.single-task {
    width: 90%;
}

.border-green {
    border-color: hsla(160, 100%, 37%, .5) !important;
}

i {
    font-size: 1.2em;
}

i:not(.urgent-badge) {
    cursor: pointer;
}

.urgent-badge {
    color: var(--bs-danger);
}

.mark-completed {
    color: var(--bs-success);
}

.mark-urgency {
    color: var(--bs-danger);
}

.edit-icon {
    color: var(--bs-yellow);
}

@media screen and (min-width: 992px) {
    .single-task {
        width: 80%;
    }

    i {
        font-size: 1.3em;
    }
}
</style>