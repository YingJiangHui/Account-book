<template>
    <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
        <li
                v-for="(item,index) in list"
                :key="index"
                :class="itemClass(item)"
                @click="select(item)"
        >{{item.text}}
        </li>
    </ul>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tabs extends Vue {
    @Prop(String) value!: string|undefined;
    @Prop(String) classPrefix!: string|undefined;
    @Prop({required:true,type:Array}) list!: DataSourceItem[]
    select(item: DataSourceItem){
        this.$emit('update:value',item.value)
    }
    itemClass(item: DataSourceItem){
      return {[this.classPrefix+'-item']:this.classPrefix,selected:this.value===item.value}
    }
  }

</script>

<style lang="scss" scoped>
    .tabs {
        display: flex;

        > li {
            font-size: 22px;
            background: #c4c4c4;
            text-align: center;
            flex: 1;
        }


    }
</style>