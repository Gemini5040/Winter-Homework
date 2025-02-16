import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    userInfo: null,
  },
  mutations: {
    login(state, userInfo) {
      state.isLoggedIn = true;
      state.userInfo = userInfo;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
  actions: {
    login({ commit }, userInfo) {
      commit('login', userInfo);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  modules: {},
});
