<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator'
    @Component
    export default class App extends Vue{
      created(): void {
        this.$store.commit('fetchRecords');
      }
    }
</script>
<style lang="scss">
    @import '~@/assets/style/reset.scss';
    @import '~@/assets/style/helper.scss';
    html,body,#app{
        height: 100%;
    }
    #app{
        margin: 0 auto;
        max-width: 500px;
        background: #f5f5f5;

    }
    body{
        background: rgba(0,0,0,0.1);
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333;
        font-family: $font-hei;
        line-height: 1.5;
    }
</style>
