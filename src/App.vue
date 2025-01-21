<template>
  <div class="post-container">
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
      <button @click="addPost" class="add-button">Add Post</button>
    </div>

    <div class="post" v-for="(post, index) in posts" :key="post.id">
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
        ></textarea>
        <p v-else class="post-text">{{ post.content }}</p>
      </div>
      <div class="post-footer">
        <button class="like-button" @click="addLike(index)">
          ❤️ Like ({{ post.likes }})
        </button>
        <button class="edit-button" @click="toggleEdit(index)">
          {{ post.isEditing ? "Save" : "Edit" }}
        </button>
        <button class="delete-button" @click="deletePost(index)">
          🗑️ Delete
        </button>
      </div>
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
          title: "Post about Vue.js",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequatur culpa nihil laborum quo nam reiciendis beatae veniam quibusdam magni. Similique distinctio ducimus repellat iusto mollitia iure corrupti, sint minima!",
          likes: 0,
          isEditing: false,
        },
        {
          id: 2,
          title: "Post about JavaScript",
          content:
            "JavaScript is a powerful programming language that enables interactive web pages. It is widely used for front-end and back-end development.",
          likes: 0,
          isEditing: false,
        },
        {
          id: 3,
          title: "Post about Web Development",
          content:
            "Web development involves building and maintaining websites. It includes front-end (client-side) and back-end (server-side) development.",
          likes: 0,
          isEditing: false,
        },
      ],
      newPost: {
        title: "",
        content: "",
      },
      nextPostId: 4,
    };
  },

  methods: {
    addLike(index) {
      this.posts[index].likes++;
    },

    toggleEdit(index) {
      this.posts[index].isEditing = !this.posts[index].isEditing;
    },

    deletePost(index) {
      this.posts.splice(index, 1);
    },

    addPost() {
      if (this.newPost.title.trim() && this.newPost.content.trim()) {
        this.posts.push({
          id: this.nextPostId++,
          title: this.newPost.title,
          content: this.newPost.content,
          likes: 0,
          isEditing: false,
        });
        this.newPost.title = "";
        this.newPost.content = "";
      }
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

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
  min-height: 100vh;
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

.post-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.like-button,
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
</style>
