<template>
  <main class="author-page">
    <section v-if="author" class="container mx-auto p-4">
      <div class="flex items-center mb-4">
        <img :src="createURl(author.avatar)" alt="author avatar" class="inline-block rounded-full w-16 h-16 mr-4">
        <h1 class="text-gray-500 text-2xl uppercase font-bold">{{ author.full_name }}</h1>
      </div>

      <p class="text-gray-500 mb-8">{{ author.short_bio }}</p>

      <div class="grid gap-4">
        <PostCard v-for="(post, i) in author.posts" :key="i" :post="post"/>
      </div>
    </section>
    <section v-else class="container mx-auto p-4">
      <p class="text-lg text-white">Loading...</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import sanity from "@/utils/client"
import { createURl } from '@/utils/helper'

const route = useRoute()
const id = ref<string | string[]>(route.params.id)
const author = ref<any>(null)

onMounted(() => {
  const query = `
  *[_type == "author" && _id == $id][0]
  {
    ...,
    "posts":*[_type == "post" && author-> _id == $id]
    {
      _id, title, excerpt, image, _createdAt,
      author-> {full_name, avatar}
    }
  }`
  const params = { id: id.value }

  sanity.fetch(query, params).then(data => {
    author.value = data
  })
})
</script>

<style scoped>

</style>
