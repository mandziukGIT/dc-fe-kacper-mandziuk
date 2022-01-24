<template> 
    <div class="selection-bar">
        <div>
            <span @click="showFavourite = false" :class="{active: !showFavourite}">All Characters</span>
        </div>
        <div>
            <span @click="showFavourite = true" :class="{active: showFavourite}">Favourites</span>
        </div>
        
    </div>
    <div class="table">
        <div class="table-head"> 
            <div class="table-head-attributes"> 
                <div>Photo</div>
                <div>Character ID</div>
                <div>Name</div>
                <div>Gender</div>
                <div>Species</div>
                <div>Last Episode</div>
                <div>Add To Favourites</div>
            </div>                
        </div>
        <div class="table-items" v-for="character in characters" :key="character.id">
            <character-row :character="character" @update-fav-characters="updateFavCharacters(character)"></character-row>
        </div>
    </div>
    <pagination></pagination>
</template>

<script>
import PaginationModule from "../components/UI/PaginationModule.vue"
import CharacterRow from '../components/CharacterRow.vue'
export default {
    components: {
        CharacterRow,
        Pagination: PaginationModule
    },
    data() {
        return {
            favouriteCharacters: [],
            showFavourite: false,
        }
    },
    methods: {
        updateFavCharacters(character) {
            const characterIndex = this.favouriteCharacters.findIndex(el => el.id === character.id);
            characterIndex >= 0 ? this.favouriteCharacters.splice(characterIndex, characterIndex + 1) : this.favouriteCharacters.push(character) 
        }
    },
    computed: {
        characters() {
            return  this.showFavourite ? this.favouriteCharacters  : this.$store.state.characters
        }
    }
}
</script>

<style lang="scss" scoped>
.selection-bar {
    display: flex; 
    padding: 3vh 5vw 3vh 10vw;
    div {
            margin: 0;
            text-align: center;
            padding-right: 50px;
            span {
                margin: 0;
            }
        }
}
.table {
    display: flex;
    flex-direction: column;
    &-head {
        padding: 15px 0;
        background-color: rgba($primary, 0.25);
    }
}
.table-head-attributes {
    margin: 0 auto;
    max-width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;  
}
.table-items {
    border-bottom: 1px solid $primary;
}
.table-head-attributes > * {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex: 1 1 0px
}
.active {
    color: $secondary;
    border-bottom: 3px solid $secondary;
}
@media (max-width: 375px) {
    .selection-bar {
        display: flex; 
        justify-content: center;
        div {
            padding-right: 0;
            margin: 0;
            flex: 1 1 0px;
            text-align: center;
            span {
                margin: 0;
            }
        }
    }
    .table-head {
        display: none;
    }
}
</style>
