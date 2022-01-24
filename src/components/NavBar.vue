<template>
    <div class="nav-bar">
        <img src="../assets/logo.svg">
        <search-module></search-module>
    </div>
</template>

<script>
import SearchModule from "./UI/SearchModule/index.vue"
export default {
    components: {
        SearchModule
    }
}
</script>

<style lang="scss" scoped>
.nav-bar{
    display: flex;
    border-bottom: 1px solid $primary;
    padding: 3vh 5vw 3vh 10vw;
}
@media (max-width: 375px) {
   .nav-bar{
       padding: 0;
       flex-direction: column;
       justify-content: center;
   } 
}
</style>