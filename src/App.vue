<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator'
    @Component()
    export default class App extends Vue{
      created(): void {
        this.$store.commit('fetchRecords');
      }
    }
</script>
<style lang="scss">
    @import '~@/assets/style/reset.scss';
    @import '~@/assets/style/helper.scss';

    body{
        background: #f5f5f5;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
        font-family: $font-hei;
        line-height: 1.5;
    }
</style>
