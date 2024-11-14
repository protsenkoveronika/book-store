<template>
  <div class="comp">
    <h2>Books</h2>
    <div v-for="book in books" :key="book.id" class="book">
      <div class="book-details">
        <h3>{{ book.name }}</h3>
        <p>{{ book.author }}</p>
        <p>{{ book.location }}</p>
      </div>
      <div class="book-btn">
        <button>Take book</button>
      </div>
    </div>
  </div>
</template>

<script>
import BooksService from "@/services/BooksService";

export default {
  // eslint-disable-next-line
  name: "Books",
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
      
    },
  },
};
</script>

<style scoped>
.comp {
  min-height: 15rem;
  padding: 0.5rem ;
}

.offer {
  display: flex;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  padding: 1rem;
}

.offer-details {
  flex: 2;
}

.offer-price {
  flex: 1;
  max-width: fit-content;
}
</style>