<script setup>
import login from '@/components/auth/login.vue'
import register from '@/components/auth/register.vue'
</script>

<template>
  <main>
    <login v-if="$route.name == 'login'" />
    <register v-if="$route.name == 'register'" />
  </main>
</template>
