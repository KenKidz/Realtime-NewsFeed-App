<template>
  <div class="bg-gray-800 rounded-lg p-4 text-center">
    <div v-if="author">
      <img :src="createURl(author.avatar)" alt="author avatar" class="inline-block rounded-full w-32 h-32 mb-4">

      <h3 class="text-2xl font-bold mb-4">{{ author.full_name }}</h3>

      <p class="text-gray-400 mb-4">{{ author.short_bio}}</p>

      <router-link :to="`/author/${author._id}`" class="btn">Profile</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createURl } from '@/utils/helper'

defineProps<{
  author: object
}>()
</script>

<style scoped>

</style>
