<template>
  <div class="log-container">
    <h2>Log In</h2>
    <p>
      Quick access to Your Account and opportunity to exchange your favourite books.
    </p>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input v-model="formData.email" type="email" class="form-control" id="email" placeholder="Your Email Address">
      </div>
      <div class="form-group">
        <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Your Password">
      </div>
      <span class="error-message">{{ validationErrors.log }}</span>
      <div class="button">
        <button type="submit" class="btn">Log In</button>
      </div>
    </form>
  </div>
</template>


<script>
import UsersService from "../services/UsersService.js";
import { mapMutations } from 'vuex';

export default {
  name: "LogIn",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      validationErrors: {
        log: "",
      },
    };
  },
  methods: {
    ...mapMutations(['setLogCheck', 'setAdminCheck', 'setUser']),

    async submitForm() {
      this.validationErrors.log = "";

      if (!this.formData.email || !this.formData.password) {
        this.validationErrors.log = "Both fields are required";
        return;
      }

      try {
        const response = await UsersService.login(this.formData);

        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);

          this.setLogCheck(true);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          this.setUser(response.data.user);

          if (response.data.role === "Administrator") {
            this.setAdminCheck(true);
          }

          this.resetForm();

          this.$router.push("/");
        } else {
          this.validationErrors.log = "Invalid email or password";
        }
      } catch (error) {
        this.validationErrors.log = "Invalid credentials. Please try again.";
        console.error("Login error:", error);
      }
    },

    resetForm() {
      this.formData = {
        email: "",
        password: "",
      };
      this.validationErrors = {
        log: "",
      };
    },
  },
};
</script>


<style scoped>
.log-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 73px 50px 0 50px;
  padding: 30px 0;
}

form {
  width: 380px;
}

h2 {
  text-align: center;
  margin: 0;
  font-weight: bold;
}

p {
  margin: 10px 0 20px 0;
  font-size: 13px;
  text-align-last: center;
}

input {
  font-size: small;
}

.form-group {
  margin-bottom: 10px;
}

.button {
  display: flex;
  justify-content: center;
  padding: 0;
}

.btn {
  border: none;
  background: #3A2970;
  border-radius: 30px;
  padding: 3px 100px;
  margin-top: 5px;
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