const state = {
    userInfo: {}
}

const getters = {
    userInfo: (state) => state.userInfo
}

const actions = {
    async setUserInfo({ commit }, userData) {
        commit('setUser', userData)
    },
    async removeUserInfo({ commit }) {
        commit('setUser', {})
    }
}

const mutations = {
    setUser: (state, userInfo) => (state.userInfo = userInfo)
}

export default {
    state,
    getters,
    actions,
    mutations
}
