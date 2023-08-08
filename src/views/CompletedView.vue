<script setup lang="ts">
import HeaderComp from '../components/Header.vue';
import FooterComp from '../components/Footer.vue';
import LoaderComp from '../components/Loader.vue';
import { onMounted, ref, type Ref } from 'vue';
import type { ITask } from '@/interfaces/ITask';
import { StorageHelper as sh } from '@/modules/StorageHelper';

const isLoading = ref(true);
const tasksArray: Ref<ITask[]> = ref([]);

function sortArray(): void {
    let urgentArr: ITask[] = tasksArray.value.filter(t => t.urgent);
    let notUrgentArr: ITask[] = tasksArray.value.filter(t => !t.urgent);
    tasksArray.value.splice(0, tasksArray.value.length);
    tasksArray.value.push(...urgentArr, ...notUrgentArr);
    updateStorage();
}

onMounted(() => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
    tasksArray.value = sh.readStorage();
    sortArray();
});

function updateStorage(): void {
    sh.saveToStorage(tasksArray.value);
}

function deleteTask(task: ITask) {
    tasksArray.value.splice(tasksArray.value.findIndex(t => t == task), 1);
    sortArray();
}

function restoreTask(task: ITask) {
    let index = tasksArray.value.findIndex(t => t == task);
    tasksArray.value[index].in_progress = true;
    sortArray();
}
</script>

<template>
    <header class="d-flex justify-content-center">
        <HeaderComp />
    </header>
    <main class="flex-grow-1">
        <div v-if="!isLoading" class="container-fluid my-5 d-flex flex-column">
            <div v-if="!tasksArray.filter(t => !t.in_progress).length"
                class="d-flex flex-grow-1 justify-content-center align-items-center">
                <h3 class="m-0 mt-4">No Tasks completed. It's time to get to work!</h3>
            </div>
            <div v-if="tasksArray.length" class="d-flex flex-column align-items-center">
                <div v-for="task of tasksArray.filter(t => !t.in_progress)" class="single-task">
                    <div
                        class="d-flex align-items-center justify-content-between px-3 py-2 my-3 border border-1 border-green rounded-5">
                        <div class="d-flex align-items-center">
                            <i v-if="task.urgent" class="bi bi-exclamation-circle-fill urgent-badge me-2"></i>
                            <p class="m-0">{{ task.content }}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="bi bi-arrow-left-circle-fill icon-restore me-2" @click="restoreTask(task)"></i>
                            <i class="bi bi-x-circle-fill icon-delete" @click="deleteTask(task)"></i>
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
i:not(.urgent-badge) {
    cursor: pointer;
}

i {
    font-size: 1.2em;
}

.urgent-badge {
    color: var(--bs-danger);
}

.icon-delete {
    color: var(--bs-danger);
}

.icon-restore {
    color: var(--bs-success);
}

.single-task {
    width: 90%;
}

.border-green {
    border-color: hsla(160, 100%, 37%, .5) !important;
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