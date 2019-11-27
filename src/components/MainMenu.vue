<template>
    <div class="flex-1 items-center">
        <div class="mt-12">
            <div class="flex justify-center">
                <svg :class="playerText" width="70" viewBox="0 0 50 50">
                    <g>
                        <line x1="2.5" y1="2.5" x2="47.5" y2="47.5" fill="none" stroke="currentColor" stroke-width="7"></line>
                        <line x1="47.5" y1="2.5" x2="2.5" y2="47.5" fill="none" stroke="currentColor" stroke-width="7"></line>
                    </g>
                </svg>
                <svg :class="otherText" width="70" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="7"/>
                </svg>
            </div>
            <div class="flex justify-center">
                <svg :class="otherText" width="70" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="7"/>
                </svg>
                <svg :class="playerText" width="70" viewBox="0 0 50 50">
                    <g>
                        <line x1="2.5" y1="2.5" x2="47.5" y2="47.5" fill="none" stroke="currentColor" stroke-width="7"></line>
                        <line x1="47.5" y1="2.5" x2="2.5" y2="47.5" fill="none" stroke="currentColor" stroke-width="7"></line>
                    </g>
                </svg>
            </div>
        </div>
        <h1 class="text-center my-8">
            Tic Tac Toe
        </h1>
        <div class="flex flex-col md:flex-row md:justify-center mb-12">
            <div class="flex items-center justify-center py-4 px-8" :class="otherBg">
                <Swatches class="mr-4" v-model="player.color"></Swatches>
                <input type="text" class="py-1 bg-white border rounded text-black px-2" :value="player.name">
            </div>
            <div class="flex items-center justify-center py-4 px-8" :class="playerBg">
                <Swatches class="mr-4" v-model="other.color"></Swatches>
                <input type="text" class="py-1 bg-white border rounded text-black px-2" :value="other.name">
            </div>
        </div>
        <div class="flex justify-center">
            <router-link to="/game" class="px-12 py-3 text-lg leading-none text-white no-underline uppercase tracking-wide font-bold rounded-full" :class="playerBg">Begin Game!</router-link>
        </div>
    </div>
</template>
<script>
import Swatches from './Swatches';
import {mapState} from 'vuex';
export default {
    components: {Swatches},
    computed: {
        ...mapState({
            player: state => state.players.player,
            other: state => state.players.other
        }),
        playerText() {
            return `text-${this.player.color}`;
        },
        playerBg() {
            return `bg-${this.player.color}`;
        },
        otherText() {
            return `text-${this.other.color}`;
        },
        otherBg() {
            return `bg-${this.other.color}`;
        },
    }
}
</script>

