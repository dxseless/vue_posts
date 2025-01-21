<template>
  <div class="post">
    <div class="post-header">
      <input v-if="post.isEditing" v-model="post.title" class="edit-input" />
      <strong v-else>Name of the post:</strong>
      <span v-if="!post.isEditing" class="post-title">{{ post.title }}</span>
    </div>
    <div class="post-content">
      <strong>Article:</strong>
      <textarea
        v-if="post.isEditing"
        v-model="post.content"
        class="edit-textarea"
      />
      <p v-else class="post-text">{{ post.content }}</p>
    </div>
    <div class="tags">
      <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <div class="post-footer">
      <button class="like-button" @click="$emit('addLike')">
        ❤️ Like ({{ post.likes }})
      </button>
      <button class="favorite-button" @click="$emit('toggleFavorite')">
        {{ post.isFavorite ? "★ Unfavorite" : "☆ Favorite" }}
      </button>
      <button class="edit-button" @click="$emit('toggleEdit')">
        {{ post.isEditing ? "Save" : "Edit" }}
      </button>
      <button class="delete-button" @click="$emit('deletePost')">
        🗑️ Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
};
</script>
