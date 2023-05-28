<template>
    <div>
        1111111
    </div>
</template>

<script setup lang="ts">
import {  getUserList } from "@/api"
import { onMounted } from "vue";
onMounted(async () => {
    const res = await Promise.all([getUserList()])
})
</script>

<style scoped></style>