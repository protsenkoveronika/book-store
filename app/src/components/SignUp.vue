<template>
  <div class="row">
    <h2>Sign Up</h2>
  </div>
  <div class="container mt-3">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="formData.email" type="email" class="form-control" name="email" placeholder="Enter email" @input="clearValidationError('email')">
          <span class="error-message">{{ validationErrors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="formData.password" type="password" class="form-control" name="password" placeholder="Enter password" @input="clearValidationError('password')">
          <span class="error-message">{{ validationErrors.password }}</span>
        </div>
        <div class="form-group">
          <label for="firstname">First Name</label>
          <input v-model="formData.firstname" type="text" class="form-control" name="firstname" placeholder="Enter first name" @input="clearValidationError('firstname')">
          <span class="error-message">{{ validationErrors.firstname }}</span>
        </div>
        <div class="form-group">
          <label for="lastname">Last Name</label>
          <input v-model="formData.lastname" type="text" class="form-control" name="lastname" placeholder="Enter last name" @input="clearValidationError('lastname')">
          <span class="error-message">{{ validationErrors.lastname }}</span>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input v-model="formData.phone" type="text" class="form-control" name="phone" id="phone" placeholder="380" @input="clearValidationError('phone')">
          <span class="error-message">{{ validationErrors.phone }}</span>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
  </div>
</template>


<script>
import UsersService from "../services/UsersService.js";
import { mapMutations } from 'vuex';
export default {
  name: "SignUp",
  data() {
    return {
      formData: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        role: "User",
      },
      validationErrors: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
      },
      tableRows: []
    };
  },
  methods: {
    ...mapMutations(['setLogCheck']),

    async submitForm() {
      const isValid = this.validateForm(
          this.formData.password,
          this.formData.firstname,
          this.formData.lastname,
          this.formData.email,
          this.formData.phone
      );

      if (!isValid) {
        return;
      }

      try {
        const response = await UsersService.create(this.formData);
        this.setLogCheck(true);
        this.resetForm();
        this.$router.push('/');
        console.log("User created successfully:", response.data);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },

    validateForm(password, firstname, lastname, email,phone) {
      let isValid = true;
      this.validationErrors = {
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      };

      if (!password.trim()) {
        isValid = false;
        this.validationErrors.password = "Enter password";
      }

      if (!firstname.trim()) {
        isValid = false;
        this.validationErrors.firstname = "Enter firstname";
      }

      if (!lastname.trim()) {
        isValid = false;
        this.validationErrors.lastname = "Enter lastname";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        isValid = false;
        this.validationErrors.email = "Incorrect email";
      }

      if (!/^38\d{10}$/.test(phone)) {
        isValid = false;
        this.validationErrors.phone = "Invalid phone number format";
      }

      return isValid;
    },

    resetForm() {
      this.formData = {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        role: "User",
      };
      this.validationErrors = {
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      };
    },

    clearValidationError(field) {
      this.validationErrors[field] = "";
    },

  },
}
</script>


<style scoped>
.row {
  justify-content: center;
  align-items: center;
  padding: 10px;
}

h2 {
  text-align: center;
  margin: 0 0 0.3rem 1rem;
}

.mt-3 {
  max-width: 100%;
  margin-bottom: 10px;
  margin-top: 0!important;
}

.error-message {
  color: red;
}
</style>
