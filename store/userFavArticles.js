import axios from "axios";

const state = {
    userFavorite: {}
}

const getters = {
    userFavorite: (state) => state.userFavorite
}

const actions = {
    async fetchUserFavorite({ commit }) {
        const res = await axios.get(
            'http://localhost:8000/api/news/user-favorites');
        commit('setUserFavorite', res.data.articles);
    },
}

const mutations = {
    setUserFavorite: (state, userFavorite) => (state.userFavorite = userFavorite)
}

export default {
    state,
    getters,
    actions,
    mutations
}
