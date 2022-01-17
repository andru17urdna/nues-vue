const devMessageObj = {
    homePage: [
        'This modal is only temporary as way to show data changing in state on page as well as interaction on each page. But also for me to give you sarcastic remarks the entire time you are here!! :D',
        'This is just a second message.',
        'This is the third message'
    ],
    search: [
        'Here you can search and it displays your most recent searches. Updates dynamically searching.'
    ],
}




const state = () => ({
    devMessage: {}
})


const getters = {
    getMessage: (state) =>  state.devMessage,
};


const actions = {
    async fetchMessage({ commit }, location) {
        commit('setMessage', devMessageObj[location]);
    },
    // async deleteArticle({ commit }, title) {
    //     commit('removeArticle', title)
    // }
}


const mutations ={
    setMessage: (state, location) => (state.devMessage = location),
    // removeArticle: (state, title) => state.articles = state.articles.filter(article => article.title !== title)
}

export default {
    state,
    getters,
    actions,
    mutations
};
