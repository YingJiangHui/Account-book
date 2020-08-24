<template>
    <Layout>
        <Tabs :value.sync="typeSelect" classPrefix="type" :list="recordTypeList"/>
        <NotContent v-if="groupList.length===0">沒有添加記錄...</NotContent>
        <div class="chart-wrapper" ref="chartWrapper">
            <Chart :options="options"/>
        </div>
        <div>
            <ol>
                <li v-for="(group,index) in groupList" :key="index">
                    <div class="title"><span>{{beautify(group.title)}}</span><span>￥{{group.totalPrice}}</span></div>
                    <ol>
                        <li class="record-item" v-for="(item,index) in group.items" :key="index">
                            <ul class="tags">
                                <li class="tag-item">{{item.tags.join('，')}}</li>
                            </ul>
                            <span class="note">{{item.notes}}</span>
                            <span class="amount">￥{{item.amount}}</span>
                        </li>
                    </ol>

                </li>
            </ol>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import NotContent from '@/components/NotContent.vue';
  import Chart from '@/components/Chart.vue';
  import _ from 'lodash';

  @Component({
    components: {
      Chart,
      NotContent,
      Tabs,
    }
  })
  export default class Statistics extends Vue {
    recordTypeList: DataSourceItem[] = recordTypeList as DataSourceItem[];
    typeSelect = "-";

    mounted(): void {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }


    get options() {
      type ArrList = { date: string; amount: number }
      const recordList = this.recordList.map((el: RecordItem)=>{el.createdAt=dayjs(el.createdAt).format('YYYY-MM-DD');return el});
      const array: ArrList[] = [];
      for (let i = 29; i >= 0; i--) {
        const today = new Date();
        const dateStr = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
        const recordItem = _.filter(recordList, {createdAt: dateStr})
        if(recordItem.length>=1){
          const amount = recordItem.reduce((sum: number,item: RecordItem)=>sum+=item.amount,0);
          array.push({date: dateStr, amount: amount});
        }else{
          array.push({date: dateStr, amount: 0});
        }
      }
      const date = array.map((el: ArrList)=>dayjs(el.date));
      const value = array.map((el: ArrList)=>el.amount);
      return {
        grid: {
          left: 0,
          right: 0
        },
        title: {
          textStyle: {color: '#333'},
          // text: typeMap[this.typeSelect]
        },
        tooltip: {
          trigger: 'item',
          position: 'top'
        },
        xAxis: {
          type: 'category',
          data: date,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#666',
            }
          }
        },
        legend: {
          data: 'aaa'
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          symbol: 'circle',
          name: 'aaa',
          type: 'line',
          data: value,
          itemStyle: {
            color: '#666'
          },
          symbolSize: 10,

          smooth: true
        }],
      };
    }


    get recordList() {
      return this.$store.state.recordList;
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame!(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame!(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame!(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    sortList(recordList: RecordItem[]): RecordItem[] {
      return clone(recordList)
        .filter((el: RecordItem) => el.type === this.typeSelect)
        .sort((a: RecordItem, b: RecordItem) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    }

    get groupList() {
      const {recordList} = this;

      const newList = this.sortList(recordList);

      if (newList.length === 0) {return [];}

      type GroupList = { title: string | undefined; totalPrice?: number; items: RecordItem[] };
      const groupList: GroupList[] = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      // 將同一天的記錄分組
      for (let i = 1; i < newList.length; i++) {
        const len = groupList.length - 1;
        const current = newList[i];
        const last = groupList[len];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          groupList.push({title: current.createdAt, items: [current]});
        }
        groupList.map(group => {
          group.totalPrice = group.items.reduce((sum, item) => {
            return sum += item.amount;
          }, 0);
        });
      }

      return groupList;
    }
  }
</script>
<style lang="scss" scoped>
    ::v-deep {
        .type-tabs {
            > .type-item {
                background: #fff;
                line-height: 64px;
            }

            > .selected {
                background: #c4c4c4;
            }
        }

        .interval-tabs {
            > .interval-item {
                line-height: 48px;
            }

            > .selected {
                border-bottom: 3px solid #000;
            }
        }
    }

    .chart-wrapper {
        overflow: auto;
    }

    .title {
        display: flex;
        justify-content: space-between;
        padding: 7px 16px;
    }

    .record-item {
        background: #fff;

        & {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 7px 16px;
        }

        .tags {
            display: flex;

            > .tag-item {
                margin-right: 5px;
            }
        }

        .note {
            margin-left: 15px;
            color: rgba(0, 0, 0, .4);
            margin-right: auto;
        }
    }
</style>