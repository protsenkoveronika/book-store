<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>
  <div class="header">
    <h1>Your orders</h1>
  </div>
  <p class="subheading">Read with pleasure!</p>
  <section class="grid" :style="{
      'grid-template-columns': reservations.length < 6
        ? 'repeat(auto-fit, minmax(155px, 160px))'
        : 'repeat(auto-fit, minmax(155px, 0.5fr))'
    }"
  >
    <div class="card" v-for="reservation in reservations" :key="reservation.id">
      <a :href="`/myOrder/${reservation.book.id}`" class="card-link">
        <div class="image-placeholder">
          <img :src="reservation.book.photo" alt="Book image" />
        </div>
        <div class="book-title">{{ reservation.book.name }}</div>
        <p class="author">{{ reservation.book.author }}</p>
        <p class="location">
          <i class="fa-solid fa-location-dot"></i> {{ reservation.book.location }}
        </p>
      </a>
    </div>
  </section>
</template>

<script>
import BooksService from "@/services/BooksService";

export default {
  name: "MyOrders",
  data() {
    return {
      reservations: [], // Store reservations instead of books
    };
  },
  mounted() {
    this.loadReservations();
  },
  methods: {
    async loadReservations() {
      try {
        const response = await BooksService.getUserReservations();
        this.reservations = response.data; // Use reservations data
      } catch (error) {
        console.error("Error loading reservations:", error);
      }
    },
  },
};
</script>


<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-book-btn {
  border: none;
  background: #3A2970;
  padding: 5px 100px;
  color: white;
}

.btn.add-book-btn {
  border-radius: 100px;
}

.add-book-btn:hover {
  background: #4c3991;
  color: white;
}

.add-book-btn:focus {
  outline: none;
  box-shadow: none;
  background: #3A2970;
}

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