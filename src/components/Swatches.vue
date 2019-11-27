<template>
    <div class="relative">
        <button class="inline-block border-2 border-grey-light w-10 h-10 hover:shadow rounded-full" 
        @click="show=!show"
        :class="`bg-${current}`"></button>
        <ul v-if="show" class="absolute z-10 pin-l list-reset flex flex-row justify-center my-1 p-1 shadow-lg rounded bg-white" v-click-outside="hide">
            <li v-for="color in colors" :key="color" @click="select(color)"
            class="mx-1 my-1 cursor-pointer">
                <span class="inline-block border-2 border-grey-light w-8 h-8 hover:border-0" :class="`bg-${color}`"></span>
            </li>
        </ul>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        props: {
            value: {default: 'blue'}
        },
        data() {
            return {
                show: false,
                current: this.value
            }
        },
        computed: mapState(['colors']),
        methods: {
            select(color) {
                this.current = color;
                this.$emit('input', color);
                this.show = false;
            },
            hide() {
                this.show = false;
            }
        }
    }
</script>