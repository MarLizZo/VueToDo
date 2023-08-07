<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';
import { type ITask } from '@/interfaces/ITask';

let inputs = defineProps(['input_content', 'input_urgency'])
const normalizedCnt = ref();
const normalizedUrg = ref();
watchEffect(() => (normalizedCnt.value = inputs.input_content));
watchEffect(() => (normalizedUrg.value = inputs.input_urgency));

const formObj: Ref<Partial<ITask>> = ref({
    content: normalizedCnt,
    urgent: normalizedUrg
});

const emit = defineEmits(['submit']);

function emitData() {
    if (formObj.value.content) {
        const newObj: ITask = {
            urgent: formObj.value.urgent!,
            content: formObj.value.content!,
            in_progress: true
        }
        emit('submit', newObj);
        normalizedCnt.value = '';
        normalizedUrg.value = false;
    }
}
</script>

<template>
    <div class="mt-4">
        <form v-on:submit.prevent="emitData()">
            <div class="d-flex justify-content-center">
                <input type="text" class="form-control border-secondary rounded-4 shadow-none w-75"
                    placeholder="Write here.." v-model="formObj.content">
                <div class="type border border-1 border-secondary px-2 d-flex align-items-center text-secondary">
                    <span>Urgency</span>
                </div>
                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end border-1 border-secondary mt-2 py-0">
                    <li><span class="dropdown-item" :class="{ 'bg-success': !formObj.urgent }"
                            v-on:click="formObj.urgent = false">Not urgent</span></li>
                    <li><span class="dropdown-item" :class="{ 'bg-success': formObj.urgent }"
                            v-on:click="formObj.urgent = true">Urgent</span></li>
                </ul>
            </div>
            <div class="d-flex justify-content-center">
                <button type="submit" :disabled="formObj.content == ''"
                    class="btn btn-outline-success mt-4 px-5 rounded-4">Save New Task</button>
            </div>

        </form>
    </div>
</template>

<style scoped>
input[type="text"] {
    background-color: var(--background-color);
    color: var(--secondary-txt);
    border-top-right-radius: var(--bs-border-radius-xl) !important;
    border-bottom-right-radius: var(--bs-border-radius-xl) !important;
}

ul {
    background-color: var(--background-color);
}

ul span {
    color: var(--secondary-txt) !important;
    cursor: pointer;
}

ul span:hover {
    background-color: rgb(100, 100, 100) !important;
}

@media screen and (min-width: 768px) {
    input[type="text"] {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }

    .type {
        background-color: var(--background-color);
        border-radius: 0 !important;
        border-right: 0 !important;
    }

    .btn:not(button[type="submit"]) {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-top-right-radius: var(--bs-border-radius-xl) !important;
        border-bottom-right-radius: var(--bs-border-radius-xl) !important;
    }
}

input[type="text"]:focus {
    border: 1px solid var(--green) !important;
}

input::placeholder {
    color: rgba(210, 210, 210, 0.404) !important;
}
</style>