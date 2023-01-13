import Vuex from 'vuex'
import userModule from './modules/user'
import moviesModule from './modules/movies'
import categoriesModule from './modules/categories'


//import mutations from '@/store/mutations'


const globalStates = {
  sidebarMinimize : true,
  sidebarShow: 'responsive',
  update: false,
}

export default new Vuex.createStore({
  state: globalStates,
  //mutations: mutations,
  modules: {
    user: userModule,
    movies: moviesModule,
    category: categoriesModule
  }
});
