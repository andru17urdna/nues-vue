//state
import axios from 'axios';

const state = {
    articles: []
}


//getters
const getters = {
    mainArticles: (state) => state.articles
}

//actions
  //asyncronous
const actions = {
    async fetchDefaultArticles({ commit }) {
        const res = await axios.get('http://localhost:8000/api/news/top-headlines');
        commit('setArticles', res.data.articles);
    },
    async fetchUserArticles( { commit }, arr ) {
        // const res = await axios.get(`http://localhost:8000/api/news/user-favorites/?tags=${arr.join(",")}`);
        const res = await axios.get(`http://localhost:8000/api/news/user-favorites`);
        console.log(res.data);
        commit('setArticles', res.data.articles);
        // commit('setArticles', res.data);
    },
    async deleteArticle({ commit }, title) {
        // await axios.delete("adddresss");
        commit('removeArticle', title)
    }
}

//mutations
  //syncrounous
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
