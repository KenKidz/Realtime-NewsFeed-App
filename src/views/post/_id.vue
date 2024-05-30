<template>
  <main class="post-page">
    <section v-if="post" class="container mx-auto p-4">
      <!-- image -->
      <img :src="createURl(post.image, 1280, 300)" class="w-full mb-8" alt="img post">
      <!-- Back button -->
      <button
        class="flex items-center text-lg text-green-500 hover:text-green-600 duration-300 mb-4"
        @click="$router.back()">
        <VIcon icon="mdi:chevron-double-left" class="text-lg mr-1" />Back
      </button>
      <!-- Title -->
      <h1 class="text-3xl md:text-5xl mb-8">{{ post.title }}</h1>
      <!-- Excerpt -->
      <p class="text-gray-500 italic mb-8">{{ post.excerpt }}</p>
      <!-- Content -->
      <p v-html="textToHTML(post.content)" class="text-lg mb-8"></p>
      <!-- Author details -->
      <div class="flex items-center mb-4">
        <img :src="createURl(post.author.avatar, 300, 300)" alt="author avatar" class="inline-block rounded-full mr-4 w-12 h-12" />
        <h1 class="text-gray-500 text-lg">{{post.author.full_name}}</h1>
      </div>
    </section>

    <section v-else>
      <p class="text-white italic text-2xl">loading...</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import sanity from '../../utils/client'
import { createURl, textToHTML } from '@/utils/helper'

const route = useRoute()
const id = ref<string | string[]>(route.params.id)
const post = ref<any>(null)

onMounted(() => {
  const query = '*[_type == "post" && _id == $id][0] { ..., author -> }'
  const params = { id: id.value }

  sanity.fetch(query, params).then(data => {
    console.log(data)
    post.value = data
  })
})
</script>

<style scoped>

</style>
