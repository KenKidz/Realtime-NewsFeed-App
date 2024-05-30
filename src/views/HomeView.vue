<template>
  <main class="home-page">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-4">Latest Posts</h1>
      <div class="grid gap-4">
        <PostCard v-for="(post, i) in posts" :key="i" :post="post" />
      </div>

      <button v-if="store.total_posts > posts.length" class="btn mt-8" @click="loadMorePost" >
        Load More ({{store.total_posts - posts.length}})
      </button>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores'
import sanity from '@/utils/client'

const store = useDataStore()
const subscription = ref<any>(null)

const posts = computed(() => store._posts)

onMounted(() => {
  store.fetchPosts(3)
  const query = '*[_type == "post"]'
  subscription.value = sanity.listen(query).subscribe(update => {
    switch (update.transition) {
      case 'update':
        sanity.getDocument(update.result.author._ref).then((author) => {
          store.updatePost({...update.result, author})
        })
        break
      case 'appear':
        sanity.getDocument(update.result.author._ref).then((author) => {
          store.addNewPost({
            ...update.result, author
          })
        })
        break
      case 'disappear':
        store.removePost(update.documentId)
        break
    }
  })
})

onUnmounted(() => {
  subscription.value.unsubscribe()
})

const loadMorePost = () => {
  store.loadMorePost(1)
}

</script>
