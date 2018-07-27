export default {
    state: {
        turn: 'player',
        player: {
            name: 'Cross',
            color: '#4cc',
            score: 0
        },
        other: {
            name: 'Circle',
            color: '#c4c',
            score: 0
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
    },
}