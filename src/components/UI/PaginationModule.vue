<template>
    <div v-if="info" style="display: flex; padding: 3vh 5vw 3vh 10vw">
        <button @click="prevPage" :disabled="currentPage === 1">
            <span class="material-icons">arrow_left</span>
        </button>
        <span v-for="page in info.pages" :key="page">
            <button :class="{active: page === currentPage}" v-if="currentPage + showAfter >= page && currentPage - showBefore <= page " @click="setCurrentPage(page)">
                {{ page }}
            </button>
        </span>
        <button @click="nextPage" :disabled="currentPage === info.pages">
            <span class="material-icons">arrow_right</span>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,  
        }
    },

    computed: {
        showAfter() {
            return this.currentPage === 1 ? 3 : 2 
        },
        showBefore() {
            return this.currentPage === 42 ? 3 : 2 
        },
        info() {
          return this.$store.state.info
        }
    },

    methods: {
        prevPage() {
            this.currentPage -= 1;
        },
        nextPage() {
            this.currentPage += 1;
        },
        setCurrentPage(page) {
            this.currentPage = page;
            this.$store.dispatch("fetchCharacters", page)
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    height: 40px;
    width: 40px;
    background-color: #FFFF;
    border: 1px solid $tertiary;
    border-radius: 5px;
    margin: 0 3px;
}
.active {
    color: #FFFF;
    background-color: $secondary;
    border: none;
}
</style>