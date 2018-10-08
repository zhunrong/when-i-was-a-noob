<template>
  <router-view />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    console.log("app");
  }
});
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>




