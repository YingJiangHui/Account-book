<template>
        <div class="chart"  ref="chart"></div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts ,{EChartOption}from 'echarts';
  import ECharts = echarts.ECharts
  @Component
  export default class Chart extends Vue {
    @Prop() options!: EChartOption;
    chart?: ECharts;
    @Watch('options',{deep: true })
    onOptionsChange(){
      if(this.chart)
      this.chart.setOption(this.options);
    }
    mounted(): void {
      const container = this.$refs.chart;
      this.chart = echarts.init(container as HTMLDivElement)
      this.chart.setOption(this.options);
    }
  }

</script>

<style lang="scss" scoped>
.chart{
    background: white;
    width: 430%;
    height: 200px;
}
</style>