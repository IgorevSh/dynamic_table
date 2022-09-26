<template>
  <home-view></home-view>
</template>

<script>
import HomeView from "@/components/HomeView";
export default {
  name: "App",
  components: {
    HomeView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  cursor: pointer;
}
</style>
