<template>
  <div class="cell" :class="classes" :style="{borderColor: currentPlayer.color}">
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props: ["cell", "index"],
  computed: {
    classes() {
      let modulo = this.index % 3;
      return {
        "border-r": modulo == 0,
        "border-l": modulo == 2,
        "border-b": this.index < 3,
        "border-t": this.index > 5,
        disabled: !this.cell.empty
      };
    },
    ...mapGetters(['currentPlayer']),
  }
};
</script>
<style>
.cell {
  cursor: pointer;
  padding: 10px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cell:hover {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2), 0 0 18px 2px rgba(0, 0, 0, 0.23);
  position: relative;
  z-index: 10;
}
.sign-container {
    height: 100%;
    width: 100%;
}
.cell svg {
    height: 100%;
    width: 100%;
}
.cell.disabled {
  cursor: not-allowed;
  pointer-events: none;
}
.border-r {
  border-right: 10px solid #2c3e50;
}
.border-b {
  border-bottom: 10px solid #2c3e50;
}
.border-l {
  border-left: 10px solid #2c3e50;
}
.border-t {
  border-top: 10px solid #2c3e50;
}
</style>