<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
    <div class="d-flex align-items-center justify-content-around py-2 border-1 border-top border-success">
        <p class="m-0">Mar.LizZo {{ year }} - Practicing with Vue</p>
        <p class="m-0">Icon Creator: <a href="https://www.flaticon.com/free-icons/to-do-list" target="_blank"
                title="to do list icons" class="link-success text-decoration-none">Graphics Plazza</a></p>
    </div>
</template>

<style scoped>
div {
    width: 95%;
}
</style>