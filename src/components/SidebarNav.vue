<template>
  <aside :class="`fixed top-0 left-0 min-h-screen pt-16 z-40 w-full max-w-xs transform duration-300 bg-gray-800 ${
    isMenuActive
  }`">
    <div class="p-4">
      <h2 class="text-gray-500 text-sm font-bold uppercase mb-2">Menu</h2>

      <div class="-mx-4">
        <MenuItem to="/">
          <VIcon icon="mdi:home" class="mr-2 text-2xl"/>Home
        </MenuItem>
        <MenuItem to="/authors">
          <VIcon icon="mdi:person-group" class="mr-2 text-2xl"/>Authors
        </MenuItem>
      </div>

    </div>
  </aside>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores'

const store = useDataStore()

const isMenuActive = computed(() =>  store.menu_is_active ? "translate-x-0" : "-translate-x-full")

</script>

<style scoped>

</style>
