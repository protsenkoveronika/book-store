<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <div class="profile-container" v-if="user">
    <h1>My Profile</h1>
    <div class="profile-content">
      <div class="avatar">
        <i class="fas fa-user-circle"></i>
      </div>
      <div class="user-info">
        <p class="user-name">{{ user.username }}</p>
        <p class="user-email">{{ user.email }}</p>
      </div>
      <button class="btn" @click="handleLogOut">
        <i class="fas fa-sign-out-alt"></i> Log out
      </button>
    </div>
  </div>
  <div v-else>
    <p>Please log in to view your profile.</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions(["fetchProfile", "logOut"]),
    async handleLogOut() {
      await this.logOut();
      this.$router.push('/');
    },
  },
  created() {
    // if (!this.user) {
    //   this.fetchProfile();
    // }
    if (!this.user) {
      this.$router.push("/login");
    }
  },
  mounted() {
    console.log("User from Vuex store:", this.$store.state.user);
  }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 15px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
}

.avatar {
  font-size: 200px;
  color: #d3d3d3;
  line-height: 1;
}

.user-info {
  margin-bottom: 30px;
}

.user-name {
  font-size: x-large;
  font-weight: bold;
  margin: 0;
}

.user-email {
  font-size: smaller;
  color: #666;
  margin: 0;
}

.btn {
  display: inline-block;
  padding: 6px 20px;
  width: 50%;
  border: 1px solid black;
  border-radius: 30px;
  font-size: 14px;
  color: black;
  text-decoration: none;
  background: none;
  transition: 0.3s;
}

.btn:hover {
  background-color: #f8f8f8;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

</style>