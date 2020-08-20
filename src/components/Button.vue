<template>
    <div class="button-wrapper">
        <button class="button" @click="$emit('click',$event)">
            <slot/>
        </button>
    </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {

  }

</script>

<style lang="scss" scoped>
    .button {
        border-radius: 4px;
        height: 40px;
        padding: 0 16px;
        border: none;
        background: #767676;
        color: white;

        &-wrapper {
            padding: 16px;
            text-align: center;
            margin: 44-16px;
        }
    }
</style>