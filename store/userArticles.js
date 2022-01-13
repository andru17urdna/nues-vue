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
    async deleteUserArticle({ commit }, title) {
        // await axios.delete("adddresss");
        commit('removeUserArticle', title)
    }
}

const mutations = {
    setUserFavorite: (state, userFavorite) => (state.userFavorite = userFavorite),
    removeUserArticle: (state, title) => state.userFavorite = state.userFavorite.filter(article => article.title !== title)

}

export default {
    state,
    getters,
    actions,
    mutations
}
