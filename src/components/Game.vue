<template>
    <div class="">
        <div class="level">
            <h4 class="player">
                <div class="score text-white" :class="`bg-${players.player.color}`" v-text="players.player.score"></div>
                <div class="uppercase text-lg" v-text="players.player.name"></div>
            </h4>
            <h1><router-link to="/" class="no-underline text-black hover:underline">Main Menu</router-link></h1>
            <h4 class="other">
                <div class="score text-white" :class="`bg-${players.other.color}`" v-text="players.other.score"></div>
                <div class="uppercase text-lg" v-text="players.other.name"></div>
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
import Cell from './Cell.vue';
import {mapState, mapGetters, mapActions} from 'vuex';
export default {
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
