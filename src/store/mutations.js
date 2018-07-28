export default {
    TOGGLE_TURN(state) {
        state.turn = state.turn == 'player' ? 'other' : 'player';
    },
    FLIP_PLAYER_TURN(state) {
        state.turn = 'player';
    },
    FLIP_OTHER_TURN(state) {
        state.turn = 'other';
    },
    CHANGE_PLAYER(state, {player, name = state.players[player].name, color = state.players[player].color}) {
        state.players[player].name = name;
        state.players[player].color = color;
    },
    INCREMENT_SCORE(state, {player = state.players[state.turn], incrementBy = 1}) {
        player.score += incrementBy;
    },
    FILL_CELL(state, cellIndex) {
        state.cells[cellIndex].empty = false;
        state.cells[cellIndex].owner = state.turn;
    },
    CLEAR_ALL_CELLS(state) {
        state.cells = state.cells.map(() => ({ empty: true, owner: '' }));
    }
}