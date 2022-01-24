<template>
    <div class="table-item"> 
        <div><img :src="character.image" /></div>
        <div>{{character.id}}</div>
        <div>{{character.name}}</div>
        <div><span class="material-icons">{{genderIcon}}</span>{{character.gender}}</div>
        <div>{{character.species}}</div>
        <div>{{lastEpisodeCode}}</div>
        <div><div class="favButton" :class="{'active': isFav}" @click="addToFav"><i class="material-icons" style="margin: auto 0">star</i></div></div>
    </div>
        <div class="mobile-table-item">
        <div class="mobile-table-attribute">
            <div>Name</div>
            <div>{{character.name}}</div>   
        </div>
        <div class="mobile-table-attribute"> 
            <div>ID</div>
            <div>{{character.id}}</div>
        </div>
        <div class="mobile-table-attribute">
            <div>Gender</div>
            <div><span class="material-icons">{{genderIcon}}</span>{{character.gender}}</div>
        </div>
        <div class="mobile-table-attribute">
            <div>Species</div>
            <div>{{character.species}}</div>
        </div>
        <div class="mobile-table-attribute">
            <div>Last Episode</div>
            <div>{{lastEpisodeCode}}</div>
        </div>
        <div class="mobile-table-attribute">
            <div class="favButton" :class="{'active': isFav}" @click="addToFav"> {{!isFav ? 'Add To Favourites' : 'Remove From Favourite'}}</div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    emits: ['update-fav-characters'],
    props: {
        character: {
            type: Object
        }
    },
    data() {
        return {
            isFav: false,
            lastEpisodeCode: null
        }
    },
    methods: {
        addToFav() {
            this.isFav = !this.isFav
            this.$emit("update-fav-characters")
        }
    },
    computed: {
        genderIcon() {
            if(this.character.gender === "Male") {
                return "male"
            } else if (this.character.gender === "Female") {
                return "female"
            } else if (this.character.gender === "Genderless") {
                return "close"
            } else {
                return "remove"
            }
        }
    },
    async mounted() {
            const lastEpisode = this.character.episode[this.character.episode.length - 1];
            const response = await axios.get(lastEpisode)
            this.lastEpisodeCode = response.data.episode;
        }
    
}
</script>

<style lang="scss" scoped>
.table-item {
    margin: 0 auto;
    max-width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & > * {
        display: flex;
        align-items: center;
        flex: 1 1 0px;
    }
}

img {
    height: 68px;
    width: 43px;
    margin: auto 0;
    padding: 5px 0;
}
.favButton{
    display: flex;
    padding: 5px;
    background-color: white;
    border: 2px solid $secondary;
    border-radius: 8px;
    justify-content: center;
    color: $secondary;
    i {
        color: $secondary
    }
    
}
.active{
    background-color: $secondary;
    color: #FFF;
i {
        color: #FFF
    }
}

i {
    display: flex;
    margin: 0;
    padding:0;
}
.mobile-table-item {
    display: none;

}

@media (max-width: 375px) {
    .table-item {
        display: none;
    }
    .mobile-table-item {
        padding: 10px 10px;
        border-bottom: 1px solid $primary;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .mobile-table-attribute {
        margin: 10px 0;
        display: flex;
        flex-direction: row;
        
        * {
            flex: 1 1 0px
        }   
    
    }
}
</style>
