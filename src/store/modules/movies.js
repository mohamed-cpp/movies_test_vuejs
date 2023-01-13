/* eslint-disable prettier/prettier */
import {loadMovies, filterMovies,loadMovie, saveMovie,deleteMovie} from '@/api/movies.js'
import router from "@/router";


const moviesModule = {
  namespaced: true,
  state: {
    movies: {},
    movie: {},
    loading: true,
  },
  getters: {
    getMovies(state) {
      return state.movies;
    },
    getMovie(state) {
      return state.movie;
    },
    getLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    SET_MOVIES: (state, movies) => {
      state.movies = movies;
    },
    SET_MOVIE: (state, movie) => {
      state.movie = movie;
    },
    SET_LOADING(state, loading){
      state.loading = loading;
    },

  },
  actions: {
      movies({ commit }){
        commit('SET_LOADING', true);
        loadMovies().then((response) => {
          let data = {};
          response.message.forEach((a) => {data[a.id] = a})
          commit('SET_MOVIES', data);
          commit('SET_LOADING', false);
        }).catch(()=>{
          alert("Error, Contect us")
        })
      },
      filterMovies({ commit }, data){
        commit('SET_LOADING', true);
        filterMovies(data).then((response) => {
          let data = {};
          response.message.forEach((a) => {data[a.id] = a})
          commit('SET_MOVIES', data);
          commit('SET_LOADING', false);
        }).catch(()=>{
          alert("Error, Contect us")
        })
      },
      movie({commit} , data){
        commit('SET_LOADING', true);
        return new Promise((resolve, reject) => {
          loadMovie(data).then((response) => {
            commit('SET_MOVIE', response.message);
            commit('SET_LOADING', false);
            resolve()
          }).catch(()=>{
            alert("Error, Contect us")
            reject()
          })
        });
    },
    save({commit} , data){
        commit('SET_LOADING', true);
        return new Promise((resolve, reject) => {
          saveMovie(data).then((response) => {
          if (response.status == 'failed' ) {
            let message = "";
            for (let errorMes in response.message) {
                message += `${response.message[errorMes][0]} `
            }
            alert(message)
          }else if(response.status == 'success'){
            router.push({
                name: 'showMoive',
                params: { name: response.message.name.replaceAll(' ', '_') , id: response.message.id }
            });
          }
            commit('SET_LOADING', false);
            resolve()
          }).catch(()=>{
            alert("Error, Contect us")
            reject()
          })
        });
    },
    delete({commit} , data){
      commit('SET_LOADING', true);
      return new Promise((resolve, reject) => {
        deleteMovie(data).then((res) => {
          commit('SET_LOADING', false);
          router.push('/');
          resolve(res)
        }).catch((res)=>{
          alert("Error, Contect us")
          reject(res)
        })
      });
  },
  },
};

export default moviesModule;
