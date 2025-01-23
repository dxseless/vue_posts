<template>
  <div class="controls">
    <input
      :value="searchQuery"
      @input="$emit('update:searchQuery', $event.target.value)"
      placeholder="Search posts..."
      class="search-input"
    />
    <button @click="$emit('toggleSort')" class="sort-button" title="Sort by Likes">
      {{ sortByLikes ? "📅 Sort by Date" : "❤️ Sort by Likes" }}
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
    sortByLikes: Boolean,
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

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #e0e0e0;
}

.sort-button,
.theme-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sort-button {
  background-color: #03dac6;
}

.theme-button {
  background-color: #6200ea;
  color: white;
}
</style>