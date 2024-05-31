<template>
  <main class="home-page">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-4">Latest Posts</h1>
      <div class="grid gap-4">
        <PostCard v-for="(post, i) in posts" :key="i" :post="post" />
      </div>
      <div v-if="loading" class="flex items-center justify-center mt-4">
        <VIcon icon="svg-spinners:3-dots-scale-middle" class="text-white text-4xl" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores'
import sanity from '@/utils/client'

const store = useDataStore()
const sentinel = ref(null);
const subscription = ref<any>(null)
const loading = ref<boolean>(false)

const posts = computed(() => store._posts)

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  await loadItems()
})

onUnmounted(() => {
  subscription.value.unsubscribe()
  window.removeEventListener('scroll', handleScroll);
})

const loadItems = async () => {
  await store.fetchPosts(3)
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
}

const handleScroll = async () => {
  const bottomOfWindow = Math.round(document.documentElement.scrollTop) + window.innerHeight >= document.documentElement.offsetHeight - 10;
  if (bottomOfWindow && !loading.value && store.total_posts !== posts.value.length) {
    loading.value = true
    await store.loadMorePost(1)
    loading.value = false
  }
}

const loadMorePost = () => {
  store.loadMorePost(1)
}

</script>
