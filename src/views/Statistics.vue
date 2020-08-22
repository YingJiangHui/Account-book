<template>
    <Layout>
        <Tabs :value.sync="typeSelect" classPrefix="type" :list="recordTypeList"/>
        <Tabs :value.sync="intervalSelect" classPrefix="interval" :list="intervalList"/>

    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue'
  import recordTypeList from '@/constants/recordTypeList'
  import intervalList from '@/constants/intervalList'

  @Component({
    components: {
      Tabs,
    }
  })
  export default class Statistics extends Vue {
    recordTypeList: DataSourceItem[] = recordTypeList as DataSourceItem[];
    intervalList = intervalList;
    typeSelect="-"
    intervalSelect = "year"
  }
</script>
<style lang="scss" scoped>
    ::v-deep {
        .type-tabs{
            >.type-item{
                background: #fff;
            }
            >.selected {
                background: #c4c4c4;
            }
        }
        .interval-tabs{
            >.selected {
                border-bottom: 3px solid #000;
            }
        }
    }
</style>