import axios from 'axios';
const defaultUserSettings = {
  id: null,
  username: null,
  session: false,
  recent_searches: null,
  favorited: null,
  queueData: {
      queue: [],
      queueIds: {}
  },
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
    userQueue: (state) => state.userInfo.queueData.queue,
    userQueueIds: (state) => state.userInfo.queueData.queueIds
}

const actions = {
    async fetchUserInfo({ commit }) {
        const res = await axios.get(
            'http://localhost:8000/api/users/user-data')
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
        console.log(data, 'STORE')
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
        state.userInfo.queueData.queue.push(data);
        console.log(typeof data.id)
        state.userInfo.queueData.queueIds[data.id] = data.id;
        console.log(state.userInfo.queueData, ' ')
        return
    },
    removeFromUserQueue: (state, id) => {
        state.userInfo.queueData.queue = state.userInfo.queueData.queue.filter(article => article.id !== id);
        delete state.userInfo.queueData.queueIds[id];
        return
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
