import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: null,
    info: null,
    currentPage: 1
  },
  mutations: {
    SET_CHARACTERS(state, payload) {
      state.characters = payload
    },
    SET_INFO(state, payload) {
      state.info = payload
    },
    SET_CURRENT_PAGE(state, payload) {
      state.currentPage = payload
    }
  },
  actions: {
    async fetchCharacters({commit, state}, payload) {
      const page = payload ? payload : state.currentPage;
      console.log(page)
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      commit("SET_CHARACTERS", response.data.results)
      commit("SET_CURRENT_PAGE", page)
      commit("SET_INFO", response.data.info)
    },
    async filterByEpisode({commit}, payload) {
      const episodeCharacters = [];
      const response = await axios.get(payload)
      for(const character of response.data.characters){
        const response = await axios.get(character)
        episodeCharacters.push(response.data)
      }
      commit("SET_CHARACTERS", episodeCharacters)
      commit("SET_INFO", response.data.info)
    },
    async findByIdentifier({commit}, payload) {
      const response = await axios.get(payload)
      commit("SET_CHARACTERS", [response.data])
      commit("SET_INFO", response.data.info)
    },
    async filterByName({commit}, payload) {
      const response = await axios.get(payload)
      commit("SET_CHARACTERS", response.data.results)
      commit("SET_INFO", response.data.info)
    }
  }
})
