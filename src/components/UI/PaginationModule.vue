<template>
    <div v-if="info && info.pages > 1" style="display: flex; padding: 3vh 5vw 3vh 10vw">
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
            currentPage: 1
        }
    },
   
    computed: {
        showAfter() {
            return this.currentPage === 1 ? 3 : this.currentPage === 2 ? 2 : 1
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
            this.$store.dispatch("fetchCharacters", this.info.prev)
        },
        nextPage() {
            this.currentPage += 1;
            this.$store.dispatch("fetchCharacters", this.info.next)
        },
        setCurrentPage(page) {
            let searchPath,queryParams;

            if(this.info.current.includes("?")) {
               [searchPath, queryParams] = this.info.current.split('?');
               if(queryParams.includes("&")) {
                    const quieries = queryParams.split("&") 
                    quieries.shift()
                    searchPath += `?page=${page}&${quieries.toString()}` 
                   this.$store.dispatch("fetchCharacters", searchPath)
               } else {
                   if(queryParams.includes("page")) {
                       searchPath += `?page=${page}`
                   } else {
                       searchPath += `?page=${page}&${queryParams.toString()}`
                   }
                   this.$store.dispatch("fetchCharacters", searchPath)
               }

            }else {
                this.$store.dispatch("fetchCharacters", this.info.current + `?page=${page}`)
            }
            this.currentPage = page;
        }
    },
    watch: {
        'info.pages'() {
            this.currentPage = 1
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