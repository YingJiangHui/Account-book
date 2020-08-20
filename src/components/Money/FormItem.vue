<template>
    <div class="form-item">
        <label>
            <span>{{fieldText}}</span>
            <input v-model="val" type="text" :placeholder="placeholder" >
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    @Prop(String) value: string|undefined;
    @Prop({required:true}) fieldText!: string;
    @Prop() placeholder!: string;
    val: string|undefined = this.value;
    @Watch('val')
    onValChanged(){
      this.$emit('update:value',this.val)
    }
  }
</script>

<style lang="scss" scoped>
    .form-item {
        padding: 12px 16px;
        font-size: 14px;

        span {
        }

        input[type=text] {
            font-weight: 100;
            background: transparent;
            padding: 0 16px;
            border: none;
            color: rgb(153, 153, 153);
        }
    }
</style>