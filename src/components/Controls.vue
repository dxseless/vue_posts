<template>
  <div class="controls">
    <input
      :value="searchQuery"
      @input="$emit('update:searchQuery', $event.target.value)"
      placeholder="Search posts..."
      class="search-input"
    />
    <button @click="$emit('toggleSort')" class="sort-button">
      {{ sortByLikes ? "Sort by Date" : "Sort by Likes" }}
    </button>
    <button @click="$emit('toggleTheme')" class="theme-button">
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
