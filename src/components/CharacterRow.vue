<template>
    <div class="table-item"> 
        <div><img :src="character.image" /></div>
        <div>{{character.id}}</div>
        <div>{{character.name}}</div>
        <div><span class="material-icons">{{genderIcon}}</span>{{character.gender}}</div>
        <div>{{character.species}}</div>
        <div>{{lastEpisodeCode}}</div>
        <div><div class="favButton" :class="{'active': isActive}" @click="addToFav"><i class="material-icons" style="margin: auto 0">star</i></div></div>
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
            isActive: false,
            lastEpisodeCode: null
        }
    },
    methods: {
        addToFav() {
            this.isActive = !this.isActive
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
.table-item > * {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex: 1 1 0px;
    margin: 0 auto;
    max-width: 80%;
    flex-direction: row;
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
    i {
        color: $secondary
    }
    
}
.active{
    background-color: $secondary;
i {
        color: #FFF
    }
}

i {
    display: flex;
    margin: 0;
    padding:0;
}

</style>