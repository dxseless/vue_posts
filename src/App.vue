<template>
  <div class="post-container">
    <div class="controls">
      <input
        v-model="searchQuery"
        placeholder="Search posts..."
        class="search-input"
      />
      <button @click="toggleSort" class="sort-button">
        {{ sortByLikes ? "Sort by Date" : "Sort by Likes" }}
      </button>
      <button @click="toggleTheme" class="theme-button">
        {{ isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode" }}
      </button>
    </div>

    <div class="add-post">
      <input
        v-model="newPost.title"
        placeholder="Post title"
        class="input-field"
      />
      <textarea
        v-model="newPost.content"
        placeholder="Post content"
        class="input-field"
      ></textarea>
      <input
        v-model="newPost.tags"
        placeholder="Tags (comma separated)"
        class="input-field"
      />
      <button @click="addPost" class="add-button">Add Post</button>
    </div>

    <transition-group name="fade" tag="div">
      <div class="post" v-for="post in paginatedPosts" :key="post.id">
        <div class="post-header">
          <input
            v-if="post.isEditing"
            v-model="post.title"
            class="edit-input"
          />
          <strong v-else>Name of the post:</strong>
          <span
            v-if="!post.isEditing"
            class="post-title"
            v-html="post.highlightedTitle"
          ></span>
        </div>
        <div class="post-content">
          <strong>Article:</strong>
          <textarea
            v-if="post.isEditing"
            v-model="post.content"
            class="edit-textarea"
          ></textarea>
          <p v-else class="post-text" v-html="post.highlightedContent"></p>
        </div>
        <div class="tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="post-footer">
          <button class="like-button" @click="addLike(post.id)">
            ❤️ Like ({{ post.likes }})
          </button>
          <button class="favorite-button" @click="toggleFavorite(post.id)">
            {{ post.isFavorite ? "★ Unfavorite" : "☆ Favorite" }}
          </button>
          <button class="edit-button" @click="toggleEdit(post.id)">
            {{ post.isEditing ? "Save" : "Edit" }}
          </button>
          <button class="delete-button" @click="deletePost(post.id)">
            🗑️ Delete
          </button>
        </div>
      </div>
    </transition-group>

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
export default {
  data() {
    return {
      posts: [
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
      ],
      newPost: {
        title: "",
        content: "",
        tags: "",
      },
      nextPostId: 4,
      searchQuery: "",
      sortByLikes: false,
      currentPage: 1,
      postsPerPage: 5,
      isDarkMode: true,
    };
  },

  computed: {
    filteredPosts() {
      let posts = this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
      );

      if (this.sortByLikes) {
        posts.sort((a, b) => b.likes - a.likes);
      } else {
        posts.sort((a, b) => b.createdAt - a.createdAt);
      }

      return posts;
    },

    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage;
      const end = start + this.postsPerPage;
      return this.filteredPosts.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage);
    },

    highlightedPosts() {
      return this.filteredPosts.map((post) => {
        const regex = new RegExp(`(${this.searchQuery})`, "gi");
        return {
          ...post,
          highlightedTitle: post.title.replace(regex, "<mark>$1</mark>"),
          highlightedContent: post.content.replace(regex, "<mark>$1</mark>"),
        };
      });
    },
  },

  methods: {
    addLike(postId) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) post.likes++;
    },

    toggleEdit(postId) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) post.isEditing = !post.isEditing;
    },

    deletePost(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId);
    },

    addPost() {
      if (this.newPost.title.trim() && this.newPost.content.trim()) {
        this.posts.push({
          id: this.nextPostId++,
          title: this.newPost.title,
          content: this.newPost.content,
          likes: 0,
          isEditing: false,
          isFavorite: false,
          createdAt: new Date(),
          tags: this.newPost.tags.split(",").map((tag) => tag.trim()),
        });
        this.newPost.title = "";
        this.newPost.content = "";
        this.newPost.tags = "";
      }
    },

    toggleFavorite(postId) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) post.isFavorite = !post.isFavorite;
    },

    toggleSort() {
      this.sortByLikes = !this.sortByLikes;
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle("light-mode", !this.isDarkMode);
    },
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
  color: #333;
}

body.light-mode .post {
  background-color: #fff;
  color: #333;
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
  color: black;
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
  border: 1px solid #333;
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
  border: 1px solid #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  padding: 20px;
  max-width: 600px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  color: black;
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
}
</style>
