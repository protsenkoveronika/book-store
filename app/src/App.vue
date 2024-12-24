<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view  />
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue";

export default {
  name: 'App',
  components: {
    RouterView,
    Header,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}
body {
  margin: 0;
}

.content {
  margin: 73px 50px 0 50px;
  padding: 25px 0;
  min-height: calc(100vh - 75px);
}


@media (max-width: 550px) {
  .content {
    margin: 73px 30px 0 30px;
    padding: 25px 0;
    min-height: calc(100vh - 75px);
  }
}

</style>
