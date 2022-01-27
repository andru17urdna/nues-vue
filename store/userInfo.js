const defaultUserSettings = {
  id: null,
  username: null,
  session: false,
  recent_searches: null,
  favorited: null,
  queueData: [],
  settings: {
    display: {
      columns: 2,
      mode: "light"
    },
    blockedSources: null
  }
}

const state = () => ({
    userInfo: defaultUserSettings,
})

const getters = {
    userInfo: (state) => state.userInfo,
    userSettings: (state) => state.userInfo.settings.display,
    userQueue: (state) => state.userInfo.queueData
}

const actions = {
    async fetchUserInfo({ commit }) {
        const res = await this.$axios.get(
            '/api/users/user-data')
            res.data.session = true;
            commit('setUser', res.data)
    },
    async removeUserInfo({ commit }) {
        commit('setUser', defaultUserSettings)
    },
    async updateUserSearches({commit}, data) {
        commit('updateUserSearches', data)
    },
    async updateUserFavorites({commit}, data) {
        commit('updateUserFavorites', data)
    },
    async removeUserFavorite({commit}, data) {
        commit('removeUserFavorite', data)
    },
    async updateUserQueue({commit}, data) {
        commit('addToUserQueue', data)
    },
    async removeUserQueue({commit}, data) {
        commit('removeFromUserQueue', data)
    },
    async updateUserSettings({commit}, data) {
        commit('updateUserSettings', data)
    }
}

const mutations = {
    setUser: (state, userInfo) => (state.userInfo = userInfo),
    updateUserSearches: (state, data) => {
        let currentState = state.userInfo.recent_searches
        currentState.unshift(data);
         return state.userInfo.recent_searches = currentState.splice(0,3)
    },
    updateUserSettings: (state, data) => {
        return state.userInfo.settings.display = data;
    },
    updateUserFavorites: (state, data) => {
        return state.userInfo.favorited.push(data);
    },
    removeUserFavorite: (state, data) => {
        return state.userInfo.favorited = state.userInfo.favorited.filter(tag => tag !== data);
    },
    addToUserQueue: (state, data) => {
        return state.userInfo.queueData.push(data);
    },
    removeFromUserQueue: (state, id) => {
        return state.userInfo.queueData = state.userInfo.queueData.filter(article => article.id !== id);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
