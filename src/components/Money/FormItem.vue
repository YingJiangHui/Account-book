<template>
    <div class="form-item">
        <label>
            <template v-if="type==='datetime-local'">

                <span>{{fieldText}}</span>
                <input :placeholder="placeholder"
                       :value="toISO(value)"
                       :type="type||'text'"
                       @change="$emit('update:value',$event.target.value)"
                >
            </template>
            <template v-else>

                <span>{{fieldText}}</span>
                <input :placeholder="placeholder"
                       :value="value"
                       @input="onInputChange($event.target.value)"
                       :type="type||'text'"
                >
            </template>
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class Notes extends Vue {
    @Prop(String) value: string|undefined;
    @Prop({required:true}) fieldText!: string;
    @Prop() placeholder!: string;
    @Prop() type!: string;

    onInputChange(value: string){
      this.$emit('update:value',value)
    }


    toISO(date: string): string{
      return dayjs(date).format('YYYY-MM-DDTHH:mm') as string;
    }
  }
</script>

<style lang="scss" scoped>
    .form-item {
        padding: 8px 16px;
        font-size: 14px;
        >label{
            display: flex;
        }
        input {
            flex-grow: 1;
            font-weight: 100;
            background: transparent;
            padding: 0 16px;
            border: none;
            color: rgb(153, 153, 153);
        }
    }
</style>