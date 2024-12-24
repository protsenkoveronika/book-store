<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <h1>Search results</h1>
  <p class="subheading">You searched for "{{ searchQuery }}"</p>
  <section class="grid" :style="{
      'grid-template-columns': filteredBooks.length < 5
        ? 'repeat(auto-fit, minmax(160px, 170px))'
        : 'repeat(auto-fit, minmax(160px, 0.5fr))'
    }">
    <div class="card" v-for="book in filteredBooks" :key="book.id">
      <a :href="`/book/${book._id}`" class="card-link">
        <div class="image-placeholder">
          <img :src="book.photo" alt="Book image" />
        </div>
        <div class="book-title">{{ book.name}}</div>
        <p class="author">{{ book.author }}</p>
        <p class="location">
          <i class="fa-solid fa-location-dot"></i> {{ book.location }}
        </p>
      </a>
      <a v-if="book.status !== 'reserved'" class="btn" :href="`/takeBook/${book._id}`">Take</a>
      <a v-else class="btn taken" :href="`/book/${book._id}`">Taken</a>
    </div>
  </section>
</template>

<script>
import BooksService from "@/services/BooksService";

export default {
  // eslint-disable-next-line
  name: "SearchResults",
  computed: {
    searchQuery() {
      return this.$route.query.q || "";
    },
    filteredBooks() {
      if (!this.searchQuery) {
        return this.books;
      }
      const query = this.searchQuery.toLowerCase();
      return this.books.filter(book =>
          book.name.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description?.toLowerCase().includes(query)
      );
    },
  },
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.loadBooks();
  },
  methods: {
    async loadBooks() {
      try {
        const response = await BooksService.getAll();
        this.books = response.data;
      } catch (error) {
        console.error("Error loading books:", error);
      }
    },
  },
};
</script>


<style scoped>
h1 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 7px;
}

.subheading {
  font-size: 12px;
  margin-bottom: 20px;
  color: #544d6c;
}

.grid {
  display: grid;
  gap: 20px;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card {
  position: unset;
  background: white;
  border: none;
  border-radius: 0;
  transition: transform 0.3s ease-in-out;
  justify-content: space-between;
}

.card:hover {
  transform: scale(1.03);
  cursor: pointer;
}

.image-placeholder {
  width: 100%;
  height: 220px;
  background: #ccc;
  border-radius: 0;
  margin-bottom: 10px;
}

.image-placeholder img {
  width: 100%;
  height: 220px;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  margin: 14px 0 5px 0;
  line-height: 1;
}

.author {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.location {
  font-size: small;
  color: #333;
  margin-bottom: 10px;
}

i {
  color: #3A2970;
  margin-right: 3px;
}

.btn.taken {
  display: inline-block;
  padding: 6px 20px;
  border: none;
  border-radius: 0;
  font-size: 14px;
  color: black;
  text-decoration: none;
  background: #e8e8e8;
}

.btn.taken:hover {
  background-color: #e8e8e8;
  color: black;
}

.btn {
  display: inline-block;
  padding: 6px 20px;
  border: 1px solid black;
  border-radius: 0;
  font-size: 14px;
  color: black;
  text-decoration: none;
  background: none;
  transition: 0.3s;
}

.btn:hover {
  background-color: #3A2970;
  color: white;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>