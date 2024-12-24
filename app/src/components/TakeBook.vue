<template>
  <div class="book-order">
    <h1>{{ book.name }}</h1>
    <h4>{{ book.author }}</h4>
    <div class="shipping-form">
      <h6>Shipping address</h6>
      <form @submit.prevent="submitForm">
        <div class="name-section">
          <div class="form-group">
            <label for="firstName">First name</label>
            <input v-model="form.firstName" type="text" id="firstName" placeholder="Your First Name" @input="clearValidationError('firstName')">
            <span v-if="validationErrors.firstName" class="error-message">{{ validationErrors.firstName }}</span>
          </div>
          <div class="form-group">
            <label for="lastName">Last name</label>
            <input v-model="form.lastName" type="text" id="lastName" placeholder="Your Last Name" @input="clearValidationError('lastName')">
            <span v-if="validationErrors.lastName" class="error-message">{{ validationErrors.lastName }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input v-model="form.address" type="text" id="address" placeholder="Your Address" @input="clearValidationError('address')">
          <span v-if="validationErrors.address" class="error-message">{{ validationErrors.address }}</span>
        </div>
        <div class="form-group">
          <label for="phone">Phone number</label>
          <input v-model="form.phone" type="tel" id="phone" placeholder="Your Phone Number" @input="clearValidationError('phone')">
          <span v-if="validationErrors.phone" class="error-message">{{ validationErrors.phone }}</span>
        </div>
        <div class="button">
          <button type="submit" class="btn">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BooksService from "@/services/BooksService";
import OrdersService from "@/services/OrdersService";
import { mapState } from "vuex";

export default {
  name: "TakeBook",
  props: {
    _id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      book: {},
      form: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
      },
      validationErrors: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.loadBook();
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
    validateForm() {
      let isValid = true;
      this.validationErrors = { firstName: '', lastName: '', address: '', phone: '' };

      if (!this.form.firstName.trim()) {
        isValid = false;
        this.validationErrors.firstName = 'First name is required';
      }

      if (!this.form.lastName.trim()) {
        isValid = false;
        this.validationErrors.lastName = 'Last name is required';
      }

      if (!this.form.address.trim()) {
        isValid = false;
        this.validationErrors.address = 'Address is required';
      }

      if (!this.form.phone.trim()) {
        isValid = false;
        this.validationErrors.phone = 'Phone number is required';
      } else if (!/^\+?\d{10,15}$/.test(this.form.phone)) {
        isValid = false;
        this.validationErrors.phone = 'Enter a valid phone number';
      }

      return isValid;
    },
    async submitForm() {
      if (!this.user) {
        alert("You must be logged in to reserve a book.");
        return;
      }

      if (this.user.id === this.book.owner._id) {
        alert("This book is yours.");
        return;
      }

      if (this.book.status === "reserved") {
        alert("This book is already reserved.");
        return;
      }

      console.log("Error reserving book:", this.user.id);
      console.log("Error reserving book:", this.book.owner._id);

      const isValid = this.validateForm();
      if (!isValid) {
        return;
      }

      try {
        const reservationData = {
          bookId: this._id,
          reservedBy: this.user._id,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          address: this.form.address,
          phoneNumber: this.form.phone,
        };

        await OrdersService.createOrder(this._id, reservationData);
        alert("Reservation successful!");
        this.resetForm();
      } catch (error) {
        console.error("Error reserving book:", error);
        alert("Failed to reserve the book.");
      }
    },
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
      };
      this.validationErrors = {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
      };
    },
    clearValidationError(field) {
      this.validationErrors[field] = '';
    },
  },
};
</script>


<style scoped>
.book-order {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
}

.shipping-form {
  border: 1px solid #ddd;
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
}

h6 {
  font-weight: bold;
  margin-bottom: 12px;
}

.name-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form-group {
  width: 49%;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 0;
  font-size: small;
}

input {
  width: 100%;
  padding: 7px;
  font-size: small;
}

h1 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 3px;
}

.button {
  display: flex;
  justify-content: center;
  padding: 0;
  width: 100%;
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

.error-message {
  color: red;
  font-size: small;
}
</style>