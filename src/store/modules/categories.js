/* eslint-disable prettier/prettier */
import {loadCategory, saveCategory, deleteCategory} from '@/api/categories.js'
// import router from "@/router";


const categoriesModule = {
  namespaced: true,
  state: {
    categories: {},
    movie: {},
    loading: true,
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getMovie(state) {
      return state.movie;
    },
    getLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    },
    SET_MOVIE: (state, movie) => {
      state.movie = movie;
    },
    SET_LOADING(state, loading){
      state.loading = loading;
    },

  },
  actions: {
      list({ commit }){
        commit('SET_LOADING', true);
        loadCategory().then((response) => {
          let data = {};
          response.message.forEach((a) => {data[a.id] = a})
          commit('SET_CATEGORIES', data);
          commit('SET_LOADING', false);
        }).catch(()=>{
          alert("Error, Contect us")
        })
      },
      save({commit, getters} , data){
        commit('SET_LOADING', true);
        return new Promise((resolve, reject) => {
          saveCategory(data).then((response) => {
            if (response.status == 'failed' ) {
              let message = "";
              for (let errorMes in response.message) {
                  message += `${response.message[errorMes][0]} `
              }
              alert(message)
            }else{
              let arr = getters.getCategories;
              arr[response.message.id] = response.message
              commit('SET_CATEGORIES', arr);
            }
            commit('SET_LOADING', false);
            resolve(response)
          }).catch((response)=>{
            alert("Error, Contect us")
            reject(response)
          })
        });
    },
    delete({commit, getters} , data){
      commit('SET_LOADING', true);
      return new Promise((resolve, reject) => {
        deleteCategory(data).then((response) => {
          if(response.status == 'success'){
            let arr = getters.getCategories;
            delete arr[data.id]
            commit('SET_CATEGORIES', arr);
          }
          commit('SET_LOADING', false);
          resolve(response)
        }).catch((response)=>{
          alert("Error, Contect us")
          reject(response)
        })
      })
    }
  //     movie({commit} , data){
  //       commit('SET_LOADING', true);
  //       return new Promise((resolve, reject) => {
  //         loadMovie(data).then((response) => {
  //           commit('SET_MOVIE', response.message);
  //           commit('SET_LOADING', false);
  //           resolve()
  //         }).catch(()=>{
  //           alert("Error, Contect us")
  //           reject()
  //         })
  //       });
  //   },
  //   delete({commit} , data){
  //     commit('SET_LOADING', true);
  //     return new Promise((resolve, reject) => {
  //       deleteMovie(data).then((res) => {
  //         commit('SET_LOADING', false);
  //         router.push('/');
  //         resolve(res)
  //       }).catch((res)=>{
  //         alert("Error, Contect us")
  //         reject(res)
  //       })
  //     });
  // },
  },
};

export default categoriesModule;
