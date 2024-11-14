<template>
  <header>
    <h1>Book Shelf</h1>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li v-if="logCheck" class="logOut" style="margin-right: 10px; cursor: pointer;" @click="logOut">Log out</li>
        <li v-else>
          <router-link to="/MyProfile" style="margin-right: 10px">My Profile</router-link>
          <router-link to="/MyBooks">My Books</router-link>
          <router-link to="/MyOrders">My Orders</router-link>
          <router-link to="/LogIn">Log in</router-link>
          <router-link to="/SignUp">Sign up</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {
  // eslint-disable-next-line
  name: "Header",
};
</script>

<style scoped>
header {
  background-color: rgba(51, 51, 51, 0.96);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

header img {
  padding-right: 20px;
  height: 60px;
  width: 80px;
}

h1 {
  font-size: 3rem;
  margin: 0 10px 0 0 ;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding-left: 20px;
  padding-right: 10px;
  justify-content: center;
  display: flex;
}

nav li {
  margin-right: 10px;
  display: flex;
  flex-direction: row;
}

nav a {
  font-size: calc(0.5rem + 0.9vw);
  margin-left: 4px;
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover {
  color: #ffcc00;
}

p {
  margin: 0 15px 0 15px;
}
</style>