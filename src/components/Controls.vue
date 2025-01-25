<template>
  <div class="controls">
    <input
      :value="searchQuery"
      @input="$emit('update:searchQuery', $event.target.value)"
      placeholder="Search posts..."
      class="search-input"
    />
    <select
      :value="selectedTag"
      @change="$emit('update:selectedTag', $event.target.value)"
      class="tag-select"
    >
      <option value="">All Tags</option>
      <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
    </select>
    <button @click="$emit('toggleSortByLikes')" class="sort-button" title="Sort by Likes">
      {{ sortByLikes ? "❤️ Sort by Likes" : "❤️ Sort by Likes" }}
    </button>
    <button @click="$emit('toggleSortByDate')" class="sort-button" title="Sort by Date">
      {{ sortByDate ? "📅 Sort by Date" : "📅 Sort by Date" }}
    </button>
    <button @click="$emit('toggleTheme')" class="theme-button" title="Toggle Theme">
      {{ isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode" }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: String,
    selectedTag: String,
    tags: Array,
    sortByLikes: Boolean,
    sortByDate: Boolean,
    isDarkMode: Boolean,
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input,
.tag-select {
  flex: 1;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  font-size: 1em;
}

.search-input:focus,
.tag-select:focus {
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
  transition: background-color 0.3s ease;
}

.sort-button:hover,
.theme-button:hover {
  background-color: #00c4b4;
}

.sort-button:active,
.theme-button:active {
  background-color: #00a896;
  transform: scale(0.95);
}
</style>