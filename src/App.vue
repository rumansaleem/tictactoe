<template>
  <div id="app">
    <div class="level">
      <h4 class="player">
        <div class="score" v-text="state.player.score"></div>
        <div class="name" :style="{ color: state.player.color}" 
          v-text="state.player.name"></div>
      </h4>
      <h1>Tic Tac Toe</h1>
      <h4 class="other">
        <div class="score" v-text="state.other.score"></div>
        <div class="name" :style="{ color: state.other.color}" 
          v-text="state.other.name"></div>
      </h4>
    </div>
    <div class="cell-container">
      <Cell v-for="(cell, index) in state.cells" :key="index" :cell="cell" @change="cellChanged(index, cell)" :index="index"/>
    </div>
  </div>
</template>

<script>
import Cell from './components/Cell.vue';
import store from './store';
export default {
  name: 'app',
  data() {
    return {
      state: store.state,
    };
  },
  components: {
    Cell
  },
  computed: {
    isPlayerTurn() {
      return this.state.turn == 'player';
    },
    currentPlayerName() {
      return this.state[this.state.turn].name
    },
    currentPlayerScore() {
      return this.state[this.state.turn].score
    }
  },
  methods: {
    cellChanged(index, cell) {
      this.state.cells[index].owner = this.state.turn
      this.state.cells[index].empty = false
      this.resolveGame(index);
    },
    resolveGame(index) {
      if(this.winStatus(index)) {
        return this.winGame();
      }
      else if( this.allFilled() ) {
        alert('Game Drawn!');
        return this.resetGame();
      }
      this.switchPlayers();
    },
    allFilled() {
      return this.state.cells.every(item => !item.empty);
    },
    switchPlayers() {
      if(this.isPlayerTurn) {
        this.state.turn = 'other';
      } else {
        this.state.turn = 'player';
      }
    },
    checks(index) {
      return this.state.checks.filter(item => item.indexOf(index) >= 0 );
    },
    winStatus(index) {
      return this.checks(index).some(
        item => item.split(' ').every(
          i => !this.state.cells[i].empty && this.state.cells[i].owner == this.state.turn 
        ) 
      );
    },
    winGame() {
      let winner = this.state[this.state.turn];
      winner.score++
      let lead = this.state.player.score - this.state.other.score;
      let leader = this.state.player;
      if (lead < 0 ) {
        leader = this.state.other;
        lead = -lead;
      }
      alert(`${winner.name} Wins, ${leader.name} is Leading by ${lead}`)
      this.resetGame();
    },
    resetGame(){
      this.state.cells.map(item => {
        item.owner = '';
        item.empty = true;
        return item;
      });
      this.state.turn = 'player';
    }
  },
  mounted() {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  overflow: hidden;
}

h1, h2, h3, h4, h5, h6 {
  margin: 10px 0px;
}

.level {
  display: flex;
  justify-content: space-around;
  align-items: center; 
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
}

.score {
  padding: 10px 5px;
  border-radius: 2px;
  border: 1px solid #bbb;
  line-height: 1;
  margin-bottom: 10px;
  font-size: 24px;
  background: linear-gradient(-15deg, #ccc, #ddd);
}

.cell-container {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
  justify-content: center;
  transform: skewX(-4deg);
}
.cell-container .cell {
  border-width: 2px;
}
@media screen and (min-width: 480px) {
  .cell-container {
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
  }
  .cell-container .cell {
    border-width: 5px;
  }
  .score {
    padding: 15px 20px;
    border-radius: 5px;
    font-size: 32px;
  }
}
@media screen and (min-width: 768px) {
  h1 {
    font-size: 40px;
  }
  .cell-container {
    grid-template-columns: repeat(3, 150px);
    grid-template-rows: repeat(3, 150px);
  }
  .cell-container .cell {
    border-width: 10px;
  }
}
</style>
