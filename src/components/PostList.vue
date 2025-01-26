<template>
  <div>
    <transition-group name="fade" tag="div">
      <PostItem
        v-for="post in visiblePosts"
        :key="post.id"
        :post="post"
        @addLike="$emit('addLike', post.id)"
        @toggleFavorite="$emit('toggleFavorite', post.id)"
        @toggleEdit="$emit('toggleEdit', post.id)"
        @deletePost="$emit('deletePost', post.id)"
      />
    </transition-group>
    <div ref="loader" class="loader" v-if="hasMorePosts">Загрузка...</div>
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";

export default {
  components: { PostItem },
  props: {
    posts: Array,
  },
  data() {
    return {
      visiblePosts: [],
      currentPage: 1,
      postsPerPage: 5,
      observer: null,
      hasMorePosts: true,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.posts.length / this.postsPerPage);
    },
  },
  watch: {
    posts: {
      immediate: true,
      handler() {
        this.loadMorePosts();
      },
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && this.hasMorePosts) {
          this.loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (this.$refs.loader) {
      this.observer.observe(this.$refs.loader);
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    loadMorePosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      const newPosts = this.posts.slice(start, end);

      if (newPosts.length > 0) {
        this.visiblePosts = [...this.visiblePosts, ...newPosts];
        this.currentPage++;
      }

      if (this.visiblePosts.length >= this.posts.length) {
        this.hasMorePosts = false;
      }
    },
  },
};
</script>

<style scoped>
.loader {
  text-align: center;
  padding: 10px;
  font-size: 1.2em;
  color: var(--text-dark);
}

body.light-mode .loader {
  color: var(--text-light);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>