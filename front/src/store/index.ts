import Vue from 'vue'
import Vuex from 'vuex'
import { City } from '../../game/city';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    city: new City()
  },
  mutations: {
    createPeople(state) {
      state.city.newRandomCitizen(1000);
    },
    runDay(state) {
      state.city.runDay();
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    city: state => state.city
  }
})
