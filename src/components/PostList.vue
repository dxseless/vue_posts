<template>
  <transition-group name="fade" tag="div">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @addLike="$emit('addLike', post.id)"
      @toggleFavorite="$emit('toggleFavorite', post.id)"
      @toggleEdit="$emit('toggleEdit', post.id)"
      @deletePost="$emit('deletePost', post.id)"
    />
  </transition-group>
</template>

<script>
import PostItem from "./PostItem.vue";

export default {
  components: { PostItem },
  props: {
    posts: Array,
  },
};
</script>
