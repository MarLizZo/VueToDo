<script setup lang="ts">
function isHome(): boolean {
    return window.location.pathname == '/';
}

function isCompleted(): boolean {
    return window.location.pathname == '/completed';
}
</script>

<template>
    <nav class="d-flex justify-content-center">
        <div class="w-100 d-flex justify-content-around align-items-center border-bottom border-1 border-success pt-2 pb-3">
            <div class="d-flex align-items-center">
                <RouterLink to="/"><img src="../assets/checklist.png"></RouterLink>
                <p class="m-0 ms-2 fw-medium">Vue ToDo</p>
            </div>
            <div class="d-flex align-items-center">
                <RouterLink to="/" class="text-decoration-none me-4"
                    :class="{ 'link-selected': isHome(), 'link-secondary': !isHome() }">
                    To do Tasks</RouterLink>
                <RouterLink to="/completed" class="text-decoration-none"
                    :class="{ 'link-selected': isCompleted(), 'link-secondary': !isCompleted() }">
                    Completed Tasks
                </RouterLink>
            </div>
            <div>
                <p class="m-0">A VueJS Project</p>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    width: 95%;
}

img {
    width: 42px;
    cursor: pointer;
}

.link-selected {
    color: var(--green);
    transition: color .1s;
}

.link-selected:hover {
    color: rgb(0, 137, 91);
}
</style>