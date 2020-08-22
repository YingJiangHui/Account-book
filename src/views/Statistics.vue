<template>
    <Layout>
        <Tabs :value.sync="typeSelect" classPrefix="type" :list="recordTypeList"/>
        <Tabs :value.sync="intervalSelect" classPrefix="interval" :list="intervalList"/>

        <div>
            <ol>
                <li v-for="(group,index) in groupList" :key="index">
                    <div class="title"><span>{{beautify(group.title)}}</span><span>合計：{{group.totalPrice}}</span></div>
                        <ol>
                            <li  class="record-item" v-for="(item,index) in group.items" :key="index">
                                <ul class="tags">
                                    <li v-if="item.tags.length===0">空</li>
                                    <li class="tag-item" v-for="(tag,index) in  item.tags" :key="index">{{tag}}</li>
                                </ul>
                                <span class="note">{{item.notes}}</span>
                                <span class="amount">￥ {{item.amount}}</span>
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
  import intervalList from '@/constants/intervalList';
  import * as dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {
      Tabs,
    }
  })
  export default class Statistics extends Vue {
    recordTypeList: DataSourceItem[] = recordTypeList as DataSourceItem[];
    intervalList = intervalList;
    typeSelect = "-";
    intervalSelect = "year";

    get recordList() {
      return this.$store.state.recordList;
    }

    beautify(string) {
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

    get groupList() {
      const {recordList} = this;
      let newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      newList = newList.filter(el=> el.type===this.typeSelect);
      type GroupList = { title: string; totalPrice?: number; items: RecordItem[] };
      const groupList: GroupList[] = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
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
          group.totalPrice= group.items.reduce((sum,item) => {
            return sum+=item.amount;
          },0);
        });
      }

      return groupList
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