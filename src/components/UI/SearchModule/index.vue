<template>
    <div class="search-module">
        <div>
            <p>Search by</p>
        </div>
        <div>
            <custom-select 
            :options="['Name', 'Identifier', 'Episode']"
            class="select"
            @option-input="changeOption"
            />
        </div>
        <div>
            <div style="display: flex">
                <input type="text" v-model="filterPhrase"/>
                <span class="material-icons" style="font-size: 2rem; padding-right: 15px; color: #11B0C8;" @click="filterCharacters">search</span>  
            </div>
        </div>
    </div>
</template>

<script>
import CustomSelect from "./CustomSelect.vue"
export default {
    components: {
        CustomSelect
    },
    data() {
        return {
            filterBy: 'Name',
            filterPhrase: ''
        }
    },
    methods: {
        changeOption(option){
            this.filterBy = option;
        },
        filterCharacters() {
            let searchEndpoint = "https://rickandmortyapi.com/api/"

            if(!this.filterPhrase) {
                this.$store.dispatch("fetchCharacters")
                return
            }

            if(this.filterBy === "Name") {
                this.$store.dispatch("filterByName", searchEndpoint +=  `character/?name=${this.filterPhrase}`)
            } else if(this.filterBy === "Identifier") {
                this.$store.dispatch("findByIdentifier", searchEndpoint += `character/${this.filterPhrase}`)
            } else if(this.filterBy === "Episode") {
                this.$store.dispatch("filterByEpisode", searchEndpoint += `episode/${this.filterPhrase}`)
            }
        }
    }
}
</script>

<style lang="scss" scpoed>
p {
    margin: auto 0;
    padding: 14px 20px;
}
.search-module {
    margin: auto 0;
    margin-left: 80px;
    border-radius: 15px;
    border: 2px solid $tertiary;
    display: inline-block;
    > * {
        display: inline-block;
    }
}
input[type="text"] {
    outline: inherit;
    border: none;
    border-radius: 15px;
    font-size: 16px;
    padding: 0 1rem;
}
</style>