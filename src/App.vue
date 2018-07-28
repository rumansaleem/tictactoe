<template>
  <div id="app">
    <div class="level">
      <h4 class="player">
        <div class="score" v-text="players.player.score"></div>
        <div class="name" :style="{ color: players.player.color}" 
          v-text="players.player.name"></div>
      </h4>
      <h1>Tic Tac Toe</h1>
      <h4 class="other">
        <div class="score" v-text="players.other.score"></div>
        <div class="name" :style="{ color: players.other.color}" 
          v-text="players.other.name"></div>
      </h4>
    </div>
    <div class="cell-container">
      <Cell v-for="(cell, index) in cells" 
        @click.native="cellChanged(index, cell)" 
        :key="index" 
        :cell="cell" 
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import Cell from './components/Cell.vue';
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';
export default {
  name: 'app',
  components: {
    Cell
  },
  computed: {
    ...mapState([ 'cells', 'checks', 'turn', 'players' ]),
    ...mapGetters(['isComplete', 'currentPlayer', 'lead', 'leader']),
  },
  methods: {
    ...mapActions(['resetGame', 'incrementScore']),
    cellChanged(index) {
      this.$store.commit('FILL_CELL', index)
      let status = this.gameStatus(index);
      this.proceedGame(status);
    },
    gameStatus(index) {
      if (this.$store.getters.hasWon(index)) {
        return 'win';
      } else if (this.isComplete) {
        return 'nowin';
      }
      return 'ongoing'
    },
    proceedGame(status) {
      this[status]();
    },
    win() {
      this.incrementScore();
      alert(`${this.currentPlayer.name} Wins, ${this.leader.name} is Leading by ${this.lead}`)
      this.resetGame();
    },
    nowin() {
      alert('Game Drawn!');
      this.resetGame();
    },
    ongoing() {
      this.$store.commit('TOGGLE_TURN');
    }
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
