//state

const state = () => ({
    articles: []
})


const getters = {
    mainArticles: (state) => state.articles,
    singleArticle: (state) => (id) => {
        return state.articles.find(article => article.id === +id)
    }
}


const actions = {
    async fetchDefaultArticles({ commit }) {
        const res = await this.$axios.get('/api/news/fox-news');
        commit('setArticles', res.data.articles);
    },
    async fetchUserArticles( { commit }, arr ) {
        const res = await this.$axios.get(`/api/news/user-favorites/?tags=${arr.join(",")}`);
        commit('setArticles', res.data.articles);

        // const res = await this.$axios.get(`/api/news/user-favorites`);
        // commit('setArticles', res.data.articles);

    },
    async deleteArticle({ commit }, title) {
        commit('removeArticle', title)
    }
}


const mutations ={
    setArticles: (state, articles) => (state.articles = articles),
    removeArticle: (state, title) => state.articles = state.articles.filter(article => article.title !== title)
}

export default {
    state,
    getters,
    actions,
    mutations
};
