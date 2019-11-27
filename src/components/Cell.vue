<template>
  <div class="cell relative" :class="classes" :style="{borderColor: currentPlayer.color}">
    <div v-if="!cell.empty" class="sign-container">
      <svg v-if="cell.owner == 'player'" viewBox="0 0 50 50">
        <g>
          <line x1="2.5" y1="2.5" x2="47.5" y2="47.5" fill="none" stroke="currentColor" stroke-width="5"></line>
          <line x1="47.5" y1="2.5" x2="2.5" y2="47.5" fill="none" stroke="currentColor" stroke-width="5"></line>
        </g>
      </svg>
      <svg v-else viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"/>
      </svg>
    </div>
    <div class="only-parent-hover sign-container absolute opacity-50 w-2/3">
      <svg v-if="isPlayerTurn" viewBox="0 0 50 50">
        <g>
          <line x1="2.5" y1="2.5" x2="47.5" y2="47.5" fill="none" stroke="currentColor" stroke-width="5"></line>
          <line x1="47.5" y1="2.5" x2="2.5" y2="47.5" fill="none" stroke="currentColor" stroke-width="5"></line>
        </g>
      </svg>
      <svg v-else viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"/>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props: ["cell", "index"],
  data() {
    return {
      mouseover: false
    }
  },
  computed: {
    classes() {
      let modulo = this.index % 3;
      return {
        "border-r-4 md:border-r-8": modulo == 0,
        "border-l-4 md:border-l-8": modulo == 2,
        "border-b-4 md:border-b-8": this.index < 3,
        "border-t-4 md:border-t-8": this.index > 5,
        disabled: !this.cell.empty
      };
    },
    isPlayerTurn() {
      return this.$store.state.turn == 'player';
    },
    ...mapGetters(['currentPlayer']),
  }
};
</script>