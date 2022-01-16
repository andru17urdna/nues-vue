import axios from 'axios';
const defaultUserSettings = {
  id: null,
  username: null,
  session: null,
  recent_searches: null,
  favorited: null,
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

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
