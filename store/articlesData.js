//state
import axios from 'axios';

const state = {
    articles: []
}


//getters
const getters = {
    allArticles: (state) => state.articles
}

//actions
  //asyncronous
const actions = {
    async fetchArticles({ commit }) {
        const res = await axios.get('http://localhost:8000/api/news/top-headlines');
        commit('setArticles', res.data.articles);
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
