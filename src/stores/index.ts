import { defineStore } from 'pinia'
import sanity from '../utils/client'

interface StoreInterface {
  menu_is_active: boolean
  posts: any
  authors: any
  total_posts: number
}

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    menu_is_active: false,
    posts: [],
    authors: [],
    total_posts: 0,
  } as StoreInterface),
  getters: {
    _posts: (state) => state.posts?.sort((a: any, b: any) => new Date(b._created_at).getTime() - new Date(a._created_at).getTime()),
  },
  actions: {
    toggleMenu(dir: null| string = null) {
      if (dir === 'open') {
        this.menu_is_active = true
      } else if(dir === 'close') {
        this.menu_is_active = false
      } else {
        this.menu_is_active = !this.menu_is_active
      }
    },

    closeMenu() {
      this.toggleMenu('close')
    },

    setPost(posts: any) {
      this.posts = posts
    },

    setAuthors(authors: any) {
      this.authors = authors
    },

    setTotalPosts(totalPosts: any) {
      this.total_posts = totalPosts
    },

    incrementTotalPosts(increment = 1) {
      this.total_posts += increment
    },

    fetchPosts(limit=null){
      const query =`*[_type == "post"] { ..., author-> } | order(_createdAt desc) ${limit ? `[0...${limit}]` : ''}`
      sanity.fetch(query).then(posts => {
        this.setPost(posts)
      })
      const count_query = 'count(*[_type == "post"])'
      sanity.fetch(count_query).then(count => {
        this.setTotalPosts(count)
      })
    },

    updatePost(post : any) {
      this.setPost(this.posts.map((p: any) => p._id === post._id ? post : p))
    },

    addNewPost(post : any) {
      this.setPost([...this.posts, post])
      this.incrementTotalPosts()
    },

    removePost(id: string | number) {
      this.setPost(this.posts.filter((p: any) => p._id !== id))
      this.incrementTotalPosts(-1)
    },

    loadMorePost(limit = 10) {
      const query = `*[_type == "post"] { ..., author-> } | order(_createdAt desc) [${this.posts.length}... ${this.posts.length + limit}]`
      sanity.fetch(query).then(posts => {
        this.setPost([...this.posts, ...posts])
      })
    },

    fetchAuthors() {
      const query = `*[_type == "author"] | order(full_name)`
      sanity.fetch(query).then(authors => {
        this.setAuthors(authors)
      })
    }
  }
})
