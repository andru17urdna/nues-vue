//state
import axios from 'axios';

const state = {
    articles: []
}


const getters = {
    mainArticles: (state) => state.articles
}


const actions = {
    async fetchDefaultArticles({ commit }) {
        const res = await axios.get('http://localhost:8000/api/news/fox-news');
        commit('setArticles', res.data.articles);
    },
    async fetchUserArticles( { commit }, arr ) {
        const res = await axios.get(`http://localhost:8000/api/news/user-favorites/?tags=${arr.join(",")}`);

        // const res = await axios.get(`http://localhost:8000/api/news/user-favorites`);
        // console.log(res.data);
        // commit('setArticles', res.data.articles);

        commit('setArticles', res.data);
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
