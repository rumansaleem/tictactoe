export default {
    resetGame: ({commit}) => {
        commit('CLEAR_ALL_CELLS')
        commit('FLIP_PLAYER_TURN')
    },
    incrementScore: ({commit}) => commit('INCREMENT_SCORE', {}),
}