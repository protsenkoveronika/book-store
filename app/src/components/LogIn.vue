<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2>Log in</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="formData.email" type="email" class="form-control" id="email" placeholder="Enter your email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Enter your password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <span class="error-message" style="margin-left: 10px">{{ validationErrors.log }}</span>
        </form>
      </div>
    </div>
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
        log: ""
      },
    };
  },
  methods: {
    ...mapMutations(['setLogCheck', 'setAdminCheck']),

    async submitForm() {
      try {
        this.validationErrors.log = "";

        const response = await UsersService.login(this.formData);

        if (response.data) {
          this.resetForm();
          this.setLogCheck(true);

          if (response.data.role === 'Administrator') {
            this.setAdminCheck(true);
          }
          this.$router.push('/');
          console.log("User logged in successfully:", response.data);


        } else {
          this.validationErrors.log = "Invalid email or password";
          console.error("Invalid email or password");
        }
      } catch (error) {
        console.error("Error during login:", error);
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
h2 {
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
}

h4 {
  margin: 5px 0 0 0;
  padding-left: 5px;
  background-color: rgba(255, 233, 143, 0.53);
}

.col-md-6.offset-md-3 {
  margin-left: 13%;
}

.mt-5, .my-5 {
  margin-bottom: 3rem!important;
}

.main_contacts li {
  margin: 10px 0;
}

.main_contacts a {
  margin-left: 30%!important;
  color: #212529!important;
}

.main_contacts i {
  margin-right: 8px;
}

.error-message {
  color: red;
}

tbody th {
  font-size: 0.75rem;
}

tbody .btn {
  font-size: 0.75rem;
  line-height: 1;
}

.table-responsive {
  margin-bottom: 10px;
}

footer {
  display: flex;
  padding-top: 10px;
  background-color: rgba(51, 51, 51, 0.96);
  color: white;
  justify-content: center;
}

h6 {
  font-weight: bold;
  margin: 0;
}

.row {
  width: 95%;
  justify-content: center;
  padding: 0;
}

.row p {
  padding: 10px;
}


.col-sm a{
  color: #ffffff;
  text-decoration: none;
}

.col-sm a:hover i {
  transition: transform 0.3s;
  transform: scale(1.2);
}

.col-sm ul {
  color: #ffffff;
  list-style: none;
}

</style>