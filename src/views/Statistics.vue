<template>
    <Layout>
        <Tabs :value.sync="typeSelect" classPrefix="type" :list="recordTypeList"/>
        <Tabs :value.sync="intervalSelect" classPrefix="interval" :list="intervalList"/>

        <div>
            <ol>
                <li v-for="(group,index) in groupList" :key="index">
                    <div class="title">{{group.title}}</div>
                    <ul>
                        <li class="record-item" v-for="(item,index) in group.items" :key="index">
                            <ul class="tags">
                                <li v-if="item.tags.length===0">無</li>
                                <li class="tag-item" v-for="(tag,index) in item.tags" :key="index">{{tag}}</li>
                            </ul>
                            <span class="note">{{item.notes}}</span>
                            <span class="amount">{{item.amount}} ￥</span>
                        </li>
                    </ul>
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
  import * as dayjs from 'dayjs'
  console.log(dayjs().format())
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

    get groupList() {
      type HashTableValue = { title: string; items: RecordItem[] };
      const hashTable: { [key: string]: HashTableValue } = {};
      const filterArr = this.recordList.filter(item => item.type === this.typeSelect);
      for (let i = 0; i < filterArr.length; i++) {

        const [date, time] = filterArr[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(filterArr[i]);
      }
      return hashTable;
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
            >.tag-item{
                padding: 0 5px;
                margin-right: 5px;
                border-radius: 20px;
                color: #fff;
                background: #c4c4c4;
            }
        }

        .note {
            margin-left: 15px;
            color: rgba(0, 0, 0, .4);
            margin-right: auto;
        }
    }
</style>