<template>
    <div class="search-module">
        <div @click="isExpanded = !isExpanded" style="text-align: center">
            <p>Search by</p>
        </div>
        <div v-if="isExpanded">
            <custom-select 
            :options="['Name', 'Identifier', 'Episode']"
            class="select"
            @option-input="changeOption"
            />
        </div>
        <div v-if="isExpanded">
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
            filterPhrase: '',
            isExpanded: false
        }
    },
    methods: {
        changeOption(option){
            this.filterBy = option;
        },
        filterCharacters() {
            let searchEndpoint = "https://rickandmortyapi.com/api/"

            if(!this.filterPhrase) {
                searchEndpoint += "character"
            } else {
                this.filterBy === "Name" ? searchEndpoint +=  `character/?name=${this.filterPhrase}` : this.filterBy === "Identifier" ? searchEndpoint += `character/${this.filterPhrase}` : searchEndpoint += `episode/${this.filterPhrase}`;
            }
              
            this.$store.dispatch("fetchCharacters", searchEndpoint)
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
@media (max-width: 375px) {
    .search-module {
        margin: 30px auto;
    > * {
        display: flex;
        justify-content: center;
    }
}

}
</style>