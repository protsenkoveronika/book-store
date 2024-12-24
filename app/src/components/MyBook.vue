<template>
  <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
  />
  <div class="book-details">
    <div class="image-placeholder">
      <img :src="book.photo" alt="Book image" />
    </div>
    <div class="book-info">
      <div>
        <h1>{{ book.name }}</h1>
        <h2 class="author">{{ book.author }}</h2>
        <section class="description">
          <h3>Description</h3>
          <p>{{ book.description }}</p>
        </section>
        <section class="location">
          <h3>Location</h3>
          <p>
            <i class="fas fa-location-dot"></i> {{ book.location }}
          </p>
        </section>
        <section class="contact-info">
          <h3>Contact Information</h3>
          <p>Username: {{ book.owner?.username }}</p>
          <p>Phone number: {{ book.owner?.contactPhone }}</p>
        </section>
      </div>
      <div v-if="book.status !== 'reserved'" class="button">
        <a class="btn" :href="`/editBook/${book.id}`">Edit</a>
        <a class="btn-delete" @click="deleteBook">Delete</a>
      </div>
      <div  v-else>
        <section class="shipping-form">
          <h3>Shipping Address</h3>
          <p>{{ reservation.firstName }} {{ reservation.lastName }}</p>
          <p>Address: {{ reservation.address }}</p>
          <p>Phone Number: {{ reservation.phoneNumber }}</p>
        </section>
        <div class="button">
          <a class="btn-delete" @click="deleteBook">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BooksService from "@/services/BooksService";
import OrdersService from "@/services/OrdersService";

export default {
  name: "MyBook",
  props: {
    _id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      book: {},
      reservation: {},
    };
  },
  mounted() {
    this.loadBook();
    this.loadReservation();
  },
  methods: {
    async loadBook() {
      try {
        const response = await BooksService.get(this._id);
        this.book = response.data;
      } catch (error) {
        console.error("Error loading book:", error);
      }
    },
    async loadReservation() {
      try {
        const response = await OrdersService.getBookReservation(this._id);
        console.log("loading reservation:", response);
        this.reservation = response.data;
      } catch (error) {
        console.error("Error loading reservation:", error);
      }
    },
    async deleteBook() {
      const confirmDeletion = confirm("Are you sure you want to delete this book?");
      if (!confirmDeletion) return;

      try {
        await BooksService.delete(this._id);
        alert("Book deleted successfully!");
        this.$router.push("/myBooks");
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete the book.");
      }
    },
  },
};
</script>


<style scoped>
.book-details {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  padding: 10px 0;
}

.image-placeholder {
  width: 300px;
  height: 420px;
  background-color: #d3d3d3;
}

.image-placeholder img {
  width: 100%;
  height: 420px;
}

.book-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 420px;
}

h1 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 3px;
}

.author {
  font-size: medium;
  color: #6c6c6c;
  margin-bottom: 20px;
}

.description,
.shipping-form,
.location,
.contact-info {
  font-size: small;
}

.description h3,
.shipping-form h3,
.location h3,
.contact-info h3 {
  margin-bottom: 5px;
  font-size: medium;
  font-weight: bold;
}

.shipping-form {
  background: #e4e4e4;
  padding: 13px;
  margin-top: 10px;
}

.shipping-form h3 {
  margin-bottom: 8px;
}

.shipping-form p {
  margin: 0;
}

.location i {
  color: #3A2970;
  margin-right: 3px;
}

.contact-info p {
  margin: 0;
}

.button {
  display: flex;
  justify-content: center;
  padding: 0;
  gap: 10px;
}

.btn-delete {
  background: white;
  border: #212529 solid 0.5px;
  border-radius: 30px;
  padding: 5px 100px;
  margin-top: 20px;
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.btn-delete:hover {
  background: #f6f6f6;
  color: black;
}

.btn-delete:focus {
  outline: none;
  box-shadow: none;
}

.btn {
  border: none;
  background: #3A2970;
  border-radius: 30px;
  padding: 5px 100px;
  margin-top: 20px;
  color: white;
}

.btn:hover {
  background: #4c3991;
  color: white;
}

.btn:focus {
  outline: none;
  box-shadow: none;
  background: #3A2970;
}
</style>