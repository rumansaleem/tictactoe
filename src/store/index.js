import Vuex from 'vuex';
import Vue from 'vue';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
Vue.use(Vuex);

const state = {
    colors: [
        'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'
    ],
    turn: 'player',
    players: {
        player: {
            name: 'Cross',
            color: 'purple',
            score: 0
        },
        other: {
            name: 'Circle',
            color: 'pink',
            score: 0
        },
    },
    checks: [
        "0 1 2", "3 4 5", "6 7 8",
        "0 3 6", "1 4 7", "2 5 8",
        "0 4 8", "2 4 6"
    ],
    cells: [
      {empty: true, owner: 'none'},
      {empty: true, owner: 'none'},
      {empty: true, owner: 'none'},
      {empty: true, owner: 'none'},
      {empty: true, owner: 'none'},
      {empty: true, owner: 'none'},
      {empty: true, owner: 'none'},
      {empty: true, owner: 'none'},
      {empty: true, owner: 'none'},
    ]
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
})