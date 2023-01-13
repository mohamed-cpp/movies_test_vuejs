<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/layout/nav.vue'
</script>

<template>
  <Nav />
  <div class="container mt-5">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
