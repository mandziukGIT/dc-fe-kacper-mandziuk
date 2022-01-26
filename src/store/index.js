import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: null,
    info: null,
  },
  mutations: {
    SET_CHARACTERS(state, payload) {
      state.characters = payload
    },
    async SET_EPISODE(state, payload) {
      const apiCalls = payload.characters.map(character => {
          return axios.get(character)
        })
      const episodeCharacters = await axios.all(apiCalls);
      state.characters = episodeCharacters.map(el => el.data)
    },
    SET_CHARACTER(state, payload) {
      state.characters = [payload]
    },
    SET_INFO(state, payload) {
      state.info = payload
    },
  },
  actions: {
    
    async fetchCharacters({commit}, payload) {
      const response = await axios.get(payload)
      if(Object.hasOwn(response.data, 'results')) {
        commit("SET_CHARACTERS", response.data.results)
        response.data.info.current = payload
      } else if(Object.hasOwn(response.data, 'characters')) {
        commit("SET_EPISODE", response.data)
        response.data.info = {
          current: payload
        }
      } else {
        commit("SET_CHARACTER", response.data)
        response.data.info = null
      }
      commit("SET_INFO", response.data.info)
    }
   
  }
})
