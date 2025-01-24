<template>
  <div class="post-container">
    <Controls
      :searchQuery="searchQuery"
      :selectedTag="selectedTag"
      :tags="tags"
      :sortByLikes="sortByLikes"
      :isDarkMode="isDarkMode"
      @update:searchQuery="searchQuery = $event"
      @update:selectedTag="selectedTag = $event"
      @toggleSort="toggleSort"
      @toggleTheme="toggleTheme"
    />

    <AddPost @addPost="addPost" />

    <PostList
      :posts="paginatedPosts"
      @addLike="addLike"
      @toggleFavorite="toggleFavorite"
      @toggleEdit="toggleEdit"
      @deletePost="deletePost"
    />

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">← Назад</button>
      <span class="paginate-counter"
        >Страница {{ currentPage }} из {{ totalPages }}</span
      >
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Вперед →
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Controls from "./components/Controls.vue";
import AddPost from "./components/AddPost.vue";
import PostList from "./components/PostList.vue";
import { usePosts } from "./composables/usePosts";

export default {
  components: { Controls, AddPost, PostList },
  setup() {
    const initialPosts = [
      {
        id: 1,
        title: "Why Vue.js is Awesome",
        content:
          "Vue.js is a progressive JavaScript framework that is approachable, versatile, and performant. It allows developers to build user interfaces and single-page applications with ease. Vue's reactivity system and component-based architecture make it a joy to work with.",
        likes: 0,
        isEditing: false,
        isFavorite: false,
        createdAt: new Date(),
        tags: ["Vue", "Frontend"],
      },
      {
        id: 2,
        title: "JavaScript: The Language of the Web",
        content:
          "JavaScript is the backbone of modern web development. It enables interactive web pages and is used for both front-end and back-end development. With the rise of frameworks like Vue, React, and Angular, JavaScript has become even more powerful.",
        likes: 0,
        isEditing: false,
        isFavorite: false,
        createdAt: new Date(),
        tags: ["JavaScript", "Web"],
      },
      {
        id: 3,
        title: "Web Development in 2023",
        content:
          "Web development continues to evolve rapidly. Trends like serverless architecture, Jamstack, and progressive web apps (PWAs) are shaping the future. Frameworks like Vue.js make it easier than ever to build modern, scalable applications.",
        likes: 0,
        isEditing: false,
        isFavorite: false,
        createdAt: new Date(),
        tags: ["Web", "Trends"],
      },
    ];

    const {
      posts,
      searchQuery,
      selectedTag,
      tags,
      sortByLikes,
      filteredPosts,
      addPost,
      deletePost,
    } = usePosts(initialPosts);

    const currentPage = ref(1);
    const postsPerPage = 5;
    const isDarkMode = ref(true);

    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage;
      const end = start + postsPerPage;
      return filteredPosts.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredPosts.value.length / postsPerPage);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const toggleSort = () => {
      sortByLikes.value = !sortByLikes.value;
    };

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      document.body.classList.toggle("light-mode", !isDarkMode.value);
    };

    const addLike = (postId) => {
      const post = posts.value.find((p) => p.id === postId);
      if (post) post.likes++;
    };

    const toggleEdit = (postId) => {
      const post = posts.value.find((p) => p.id === postId);
      if (post) post.isEditing = !post.isEditing;
    };

    const toggleFavorite = (postId) => {
      const post = posts.value.find((p) => p.id === postId);
      if (post) post.isFavorite = !post.isFavorite;
    };

    return {
      posts,
      searchQuery,
      selectedTag,
      tags,
      sortByLikes,
      isDarkMode,
      paginatedPosts,
      currentPage,
      totalPages,
      addPost,
      deletePost,
      nextPage,
      prevPage,
      toggleSort,
      toggleTheme,
      addLike,
      toggleEdit,
      toggleFavorite,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0a0a0a;
  color: #e0e0e0;
  font-family: "Arial", sans-serif;
}

body.light-mode {
  background-color: #f5f5f5;
  color: #000000;
}

body.light-mode .post {
  background-color: #fff;
  color: #000000;
  border-color: #ddd;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
  min-height: 100vh;
}

.controls {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  font-size: 1em;
}

.search-input:focus {
  outline: none;
  border-color: #bb86fc;
}

.sort-button,
.theme-button {
  background-color: #03dac6;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 0 10px rgba(3, 218, 198, 0.5);
}

.sort-button:hover,
.theme-button:hover {
  background-color: #00c4b4;
  box-shadow: 0 0 15px rgba(0, 196, 180, 0.8);
}

.sort-button:active,
.theme-button:active {
  background-color: #00a896;
  transform: scale(0.95);
}

.add-post {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #000000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.input-field {
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  font-size: 1em;
}

.input-field:focus {
  outline: none;
  border-color: #bb86fc;
}

.add-button {
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 0 10px rgba(98, 0, 234, 0.5);
}

.add-button:hover {
  background-color: #7c4dff;
  box-shadow: 0 0 15px rgba(124, 77, 255, 0.8);
}

.add-button:active {
  background-color: #3700b3;
  transform: scale(0.95);
}

.post {
  background-color: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #000000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  padding: 20px;
  max-width: 600px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 20px;
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
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 0.8em;
  margin-bottom: 15px;
  font-weight: bold;
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
  color: #000;
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
  color: #000;
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

.edit-input,
.edit-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  font-size: 1em;
}

.edit-input:focus,
.edit-textarea:focus {
  outline: none;
  border-color: #bb86fc;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  background-color: #03dac6;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 0 10px rgba(3, 218, 198, 0.5);
}

.pagination button:hover {
  background-color: #00c4b4;
  box-shadow: 0 0 15px rgba(0, 196, 180, 0.8);
}

.pagination button:active {
  background-color: #00a896;
  transform: scale(0.95);
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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

.paginate-counter {
  padding: 8px 15px;
  border: 3px solid #af10e4;
  border-radius: 8px;
  font-weight: bold;
  color: #fff;
}
</style>
