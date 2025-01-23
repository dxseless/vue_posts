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
      <button class="delete-button" @click="showDeleteModal = true">
        🗑️ Delete
      </button>
    </div>

    <DeleteModal
      v-if="showDeleteModal"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script>
import DeleteModal from "./DeleteModal.vue";

export default {
  components: { DeleteModal },
  props: {
    post: Object,
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  methods: {
    confirmDelete() {
      this.$emit("deletePost");
      this.showDeleteModal = false;
    },
  },
};
</script>

<style scoped>
.post {
  background-color: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  padding: 20px;
  max-width: 600px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(106, 90, 205, 0.6);
}

.post-header {
  margin-bottom: 15px;
}

.post-title {
  font-size: 1.5em;
  color: #bb86fc;
  margin-left: 10px;
  text-shadow: 0 0 5px #bb86fc, 0 0 10px #bb86fc;
}

.post-content {
  margin-bottom: 20px;
}

.post-text {
  font-size: 1em;
  line-height: 1.6;
  color: #e0e0e0;
  margin-top: 10px;
}

.tags {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.tag {
  background-color: #6200ea;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8em;
}

.post-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.like-button,
.favorite-button,
.edit-button,
.delete-button {
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
}

.like-button {
  background-color: #6200ea;
  color: white;
  box-shadow: 0 0 10px rgba(98, 0, 234, 0.5);
}

.like-button:hover {
  background-color: #7c4dff;
  box-shadow: 0 0 15px rgba(124, 77, 255, 0.8);
}

.like-button:active {
  background-color: #3700b3;
  transform: scale(0.95);
}

.favorite-button {
  background-color: #ffd700;
  color: black;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.favorite-button:hover {
  background-color: #ffc800;
  box-shadow: 0 0 15px rgba(255, 200, 0, 0.8);
}

.favorite-button:active {
  background-color: #e6b800;
  transform: scale(0.95);
}

.edit-button {
  background-color: #03dac6;
  color: black;
  box-shadow: 0 0 10px rgba(3, 218, 198, 0.5);
}

.edit-button:hover {
  background-color: #00c4b4;
  box-shadow: 0 0 15px rgba(0, 196, 180, 0.8);
}

.edit-button:active {
  background-color: #00a896;
  transform: scale(0.95);
}

.delete-button {
  background-color: #cf6679;
  color: white;
  box-shadow: 0 0 10px rgba(207, 102, 121, 0.5);
}

.delete-button:hover {
  background-color: #b00020;
  box-shadow: 0 0 15px rgba(176, 0, 32, 0.8);
}

.delete-button:active {
  background-color: #8e001a;
  transform: scale(0.95);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.modal p {
  color: #e0e0e0;
  margin-bottom: 20px;
}

.modal button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.modal-confirm {
  background-color: #cf6679;
  color: white;
}

.modal-confirm:hover {
  background-color: #b00020;
}

.modal-cancel {
  background-color: #03dac6;
  color: black;
}

.modal-cancel:hover {
  background-color: #00c4b4;
}
</style>
