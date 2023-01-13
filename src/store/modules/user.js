/* eslint-disable prettier/prettier */
import router from "@/router";
import {loginUser, registerUser} from '@/api/user.js'
import { setLogged, setToken,removeToken, getToken } from '../../utils/auth';

const userModule = {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER(state, data){
      state.me = data;
    },

  },
  actions: {
      login({ commit }, data){
        loginUser(data).then((response) => {
        commit('SET_TOKEN', response.authorisation.token);
        setLogged('1');
        setToken(response.authorisation.token);
        router.push('/');
        }).catch((res)=>{
          alert(res.response.data.message)
          router.push('/register?email='+data.email);
        })
      },
      register({ commit }, data){
        registerUser(data).then((response) => {
          if(response.status == 'success' ){
            commit('SET_TOKEN', response.authorisation.token);
            setLogged('1');
            setToken(response.authorisation.token);
            router.push('/');
          }
        }).catch((res)=>{
          alert(res.response.data.message)
        })
      },
    logout({ commit }) {
      removeToken();
      commit('SET_TOKEN', null);
      router.push("/login");
    },
    updateCookie({ commit }) {
      commit('SET_TOKEN', getToken());
    },
  },
};

export default userModule;
