export default {
    isComplete: state => {
        return state.cells.every(cell => !cell.empty);
    },
    currentPlayer: state => state.players[state.turn],
    signedLead: state => state.players.player.score - state.players.other.score,
    leader: (state, getters) => getters.signedLead < 0 ? state.players.other : state.players.player,
    lead: (state, getters) => Math.abs(getters.signedLead),
    hasWon: (state) => (cellIndex) => {
        let res = state.checks
            .filter(item => item.indexOf(cellIndex) >= 0)
            .some( item => item.split(' ').every( i => !state.cells[i].empty && state.cells[i].owner == state.turn ) );
        return res;
    }
}