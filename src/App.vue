<template>
  <nav-bar></nav-bar>
  <characters-table></characters-table>
</template>

<script>
import NavBar from "./components/NavBar.vue"
import CharactersTable from "./components/CharactersTable.vue"
export default {
  components: {
    NavBar,
    CharactersTable
  },
  mounted() {
    this.$store.dispatch('fetchCharacters');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  color: $tertiary;
}
body {
  margin: 0;
}
</style>
