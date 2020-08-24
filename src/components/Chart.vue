<template>
        <div class="chart"  ref="chart"></div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import echarts ,{EChartOption}from 'echarts';
  @Component
  export default class Chart extends Vue {
    screenW = document.documentElement.clientWidth

    @Prop() options?: EChartOption;
    chart;
    @Watch('options',{deep: true })
    onOptionChange(){
      this.chart.setOption(this.options);

    }
    mounted(): void {
      const container = this.$refs.chart;
      this.chart = echarts.init(container)
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