<template>
    <div class="form-item">
        <label>
            <span>{{fieldText}}</span>
            <input :placeholder="placeholder" :value="value" @input="onInputChange($event.target.value)" type="text" >
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    @Prop(String) value: string|undefined;
    @Prop({required:true}) fieldText!: string;
    @Prop() placeholder!: string;
    onInputChange(value: string){
      this.$emit('update:value',value)
    }
  }
</script>

<style lang="scss" scoped>
    .form-item {
        padding: 12px 16px;
        font-size: 14px;
        >label{
            display: flex;
        }
        input[type=text] {
            flex-grow: 1;
            font-weight: 100;
            background: transparent;
            padding: 0 16px;
            border: none;
            color: rgb(153, 153, 153);
        }
    }
</style>