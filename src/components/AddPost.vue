<template>
  <div class="add-post">
    <input v-model="title" placeholder="Post title" class="input-field" />
    <textarea
      v-model="content"
      placeholder="Post content"
      class="input-field"
    />
    <input
      v-model="tags"
      placeholder="Tags (comma separated)"
      class="input-field"
    />
    <button @click="handleAddPost" class="add-button">Add Post</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      tags: "",
    };
  },
  methods: {
    handleAddPost() {
      this.$emit("addPost", {
        title: this.title,
        content: this.content,
        tags: this.tags,
      });
      this.title = "";
      this.content = "";
      this.tags = "";
    },
  },
};
</script>
