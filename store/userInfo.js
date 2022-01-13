import axios from 'axios';

const state = {
    userInfo: {}
}

const getters = {
    userInfo: (state) => state.userInfo
}

const actions = {
    async fetchUserInfo({ commit }) {
        const res = await axios.get(
            'http://localhost:8000/api/users/user-data')
            res.data.session = true;
            commit('setUser', res.data)
    },
    async removeUserInfo({ commit }) {
        commit('setUser', {})
    },
    async updateUserSearches({commit}, data) {
        commit('updateUserSearches', data)
    }
}

const mutations = {
    setUser: (state, userInfo) => (state.userInfo = userInfo),
    updateUserSearches: (state, data) => {
        let currentState = state.userInfo.recent_searches
        currentState.unshift(data);
         return state.userInfo.recent_searches = currentState.splice(0,3)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
