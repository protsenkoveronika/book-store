<template>
  <div class="comp">
    <router-view name="updateComp" />
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Update",
}
</script>

<style scoped>

.comp {
  min-height: 15rem;
}

</style>