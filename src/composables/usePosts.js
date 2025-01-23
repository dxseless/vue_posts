import { ref, computed } from "vue";

export function usePosts(initialPosts) {
  const posts = ref(initialPosts);
  const searchQuery = ref("");
  const sortByLikes = ref(false);

  const filteredPosts = computed(() => {
    let filtered = posts.value.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    );

    if (sortByLikes.value) {
      filtered.sort((a, b) => b.likes - a.likes);
    } else {
      filtered.sort((a, b) => b.createdAt - a.createdAt);
    }

    return filtered;
  });

  const addPost = (newPost) => {
    if (newPost.title.trim() && newPost.content.trim()) {
      posts.value.push({
        id: posts.value.length + 1,
        ...newPost,
        likes: 0,
        isEditing: false,
        isFavorite: false,
        createdAt: new Date(),
        tags: newPost.tags.split(",").map((tag) => tag.trim()),
      });
    }
  };

  const deletePost = (postId) => {
    posts.value = posts.value.filter((post) => post.id !== postId);
  };

  return {
    posts,
    searchQuery,
    sortByLikes,
    filteredPosts,
    addPost,
    deletePost,
  };
}