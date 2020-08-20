<template>
    <div class="notes">
        <label>
            <span>备注</span>
            <input v-model="val" type="text" placeholder="在这里添加标签">
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    @Prop(String) value!: string;
    val: string = this.value;

    @Watch('val')
    onValChanged(){
      this.$emit('update:value',this.val)
    }
  }
</script>

<style lang="scss" scoped>
    .notes {
        background: rgb(245, 245, 245);
        padding: 20px 18px;
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