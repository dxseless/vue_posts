<template>
  <div class="post-container">
    <Controls
      :searchQuery="searchQuery"
      :selectedTag="selectedTag"
      :tags="tags"
      :sortByLikes="sortByLikes"
      :sortByDate="sortByDate"
      :isDarkMode="isDarkMode"
      @update:searchQuery="searchQuery = $event"
      @update:selectedTag="selectedTag = $event"
      @toggleSortByLikes="toggleSortByLikes"
      @toggleSortByDate="toggleSortByDate"
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
        createdAt: new Date("2023-10-01"),
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
        createdAt: new Date("2023-09-15"),
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
        createdAt: new Date("2023-10-10"),
        tags: ["Web", "Trends"],
      },
    ];

    const {
      posts,
      searchQuery,
      selectedTag,
      tags,
      sortByLikes,
      sortByDate,
      filteredPosts,
      addPost,
      deletePost,
      toggleSortByLikes,
      toggleSortByDate,
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
      sortByDate,
      isDarkMode,
      paginatedPosts,
      currentPage,
      totalPages,
      addPost,
      deletePost,
      nextPage,
      prevPage,
      toggleSortByLikes,
      toggleSortByDate,
      toggleTheme,
      addLike,
      toggleEdit,
      toggleFavorite,
    };
  },
};
</script>

<style>
:root {
  --background-dark: #0a0a0a;
  --text-dark: #e0e0e0;
  --background-light: #f5f5f5;
  --text-light: #333;
  --primary-color: #6200ea;
  --secondary-color: #03dac6;
  --accent-color: #bb86fc;
  --error-color: #cf6679;
  --warning-color: #ffd700;
  --border-dark: #333;
  --border-light: #ddd;
  --neon-primary: #bb86fc;
  --neon-secondary: #03dac6;
  --neon-accent: #ff00ff;
}

body {
  background-color: var(--background-dark);
  color: var(--text-dark);
  font-family: "Arial", sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

body.light-mode {
  background-color: var(--background-light);
  color: var(--text-light);
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(145deg, var(--background-dark), #0a0a0a);
  min-height: 100vh;
}

body.light-mode .post-container {
  background: linear-gradient(145deg, var(--background-light), #f5f5f5);
}

.controls {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.search-input,
.tag-select {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-dark);
  border-radius: 8px;
  background-color: var(--background-dark);
  color: var(--text-dark);
  font-size: 1em;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}

body.light-mode .search-input,
body.light-mode .tag-select {
  border-color: var(--border-light);
  background-color: var(--background-light);
  color: var(--text-light);
}

.search-input:focus,
.tag-select:focus {
  outline: none;
  border-color: var(--neon-primary);
  box-shadow: 0 0 10px var(--neon-primary);
}

.sort-button,
.theme-button {
  background-color: var(--secondary-color);
  color: var(--text-light);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 0 10px rgba(3, 218, 198, 0.5);
}

body.light-mode .sort-button,
body.light-mode .theme-button {
  color: var(--text-light);
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
  background-color: var(--background-dark);
  border-radius: 12px;
  border: 1px solid var(--border-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s;
}

body.light-mode .add-post {
  background-color: var(--background-light);
  border-color: var(--border-light);
}

.add-post:hover {
  box-shadow: 0 0 20px var(--neon-primary);
}

.input-field {
  padding: 10px;
  border: 1px solid var(--border-dark);
  border-radius: 8px;
  background-color: var(--background-dark);
  color: var(--text-dark);
  font-size: 1em;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}

body.light-mode .input-field {
  border-color: var(--border-light);
  background-color: var(--background-light);
  color: var(--text-light);
}

.input-field:focus {
  outline: none;
  border-color: var(--neon-primary);
  box-shadow: 0 0 10px var(--neon-primary);
}

.add-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 0 10px rgba(98, 0, 234, 0.5);
}

.add-button:hover {
  background-color: #7c4dff;
  box-shadow: 0 0 20px var(--neon-primary);
}

.add-button:active {
  background-color: #3700b3;
  transform: scale(0.95);
}

.post {
  background-color: var(--background-dark);
  border-radius: 12px;
  border: 1px solid var(--border-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  padding: 20px;
  max-width: 600px;
  width: 100%;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s, border-color 0.3s;
  margin-bottom: 20px;
}

body.light-mode .post {
  background-color: var(--background-light);
  border-color: var(--border-light);
  color: var(--text-light);
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px var(--neon-primary);
}

.post-header {
  margin-bottom: 15px;
}

.post-title {
  font-size: 1.5em;
  color: var(--neon-primary);
  margin-left: 10px;
  text-shadow: 0 0 5px var(--neon-primary), 0 0 10px var(--neon-primary);
  animation: neonGlow 1.5s infinite alternate;
}

@keyframes neonGlow {
  from {
    text-shadow: 0 0 5px var(--neon-primary), 0 0 10px var(--neon-primary);
  }
  to {
    text-shadow: 0 0 10px var(--neon-primary), 0 0 20px var(--neon-primary);
  }
}

body.light-mode .post-title {
  color: var(--primary-color);
  text-shadow: none;
  animation: none;
}

.post-content {
  margin-bottom: 20px;
}

.post-text {
  font-size: 1em;
  line-height: 1.6;
  color: var(--text-dark);
  margin-top: 10px;
}

body.light-mode .post-text {
  color: var(--text-light);
}

.tags {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.tag {
  background-color: var(--primary-color);
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8em;
  transition: box-shadow 0.3s;
}

.tag:hover {
  box-shadow: 0 0 10px var(--neon-primary);
}

body.light-mode .tag {
  background-color: var(--secondary-color);
  color: black;
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
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
}

.like-button {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 0 10px rgba(98, 0, 234, 0.5);
}

.like-button:hover {
  background-color: #7c4dff;
  box-shadow: 0 0 20px var(--neon-primary);
}

.like-button:active {
  background-color: #3700b3;
  transform: scale(0.95);
}

.favorite-button {
  background-color: var(--warning-color);
  color: black;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.favorite-button:hover {
  background-color: #ffc800;
  box-shadow: 0 0 20px var(--neon-accent);
}

.favorite-button:active {
  background-color: #e6b800;
  transform: scale(0.95);
}

.edit-button {
  background-color: var(--secondary-color);
  color: black;
  box-shadow: 0 0 10px rgba(3, 218, 198, 0.5);
}

.edit-button:hover {
  background-color: #00c4b4;
  box-shadow: 0 0 20px var(--neon-secondary);
}

.edit-button:active {
  background-color: #00a896;
  transform: scale(0.95);
}

.delete-button {
  background-color: var(--error-color);
  color: white;
  box-shadow: 0 0 10px rgba(207, 102, 121, 0.5);
}

.delete-button:hover {
  background-color: #b00020;
  box-shadow: 0 0 20px var(--neon-accent);
}

.delete-button:active {
  background-color: #8e001a;
  transform: scale(0.95);
}

.edit-input,
.edit-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-dark);
  border-radius: 8px;
  background-color: var(--background-dark);
  color: var(--text-dark);
  font-size: 1em;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}

body.light-mode .edit-input,
body.light-mode .edit-textarea {
  border-color: var(--border-light);
  background-color: var(--background-light);
  color: var(--text-light);
}

.edit-input:focus,
.edit-textarea:focus {
  outline: none;
  border-color: var(--neon-primary);
  box-shadow: 0 0 10px var(--neon-primary);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  background-color: var(--secondary-color);
  color: black;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 0 10px rgba(3, 218, 198, 0.5);
}

.pagination button:hover {
  background-color: #00c4b4;
  box-shadow: 0 0 20px var(--neon-secondary);
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
  border: 3px solid var(--neon-primary);
  border-radius: 8px;
  font-weight: bold;
  color: var(--text-dark);
  animation: neonGlow 1.5s infinite alternate;
}

body.light-mode .paginate-counter {
  color: var(--text-light);
  animation: none;
}
</style>
