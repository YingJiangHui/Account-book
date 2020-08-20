<template>
    <Layout classPrefix="money">
        <NumberPad :value.sync="record.amount" @submit="saveRecord" />
        <Types :value.sync="record.type"/>
        <Notes :value.sync="record.notes"/>
        <Tags @update:value="updateTags" :dataSource.sync="tags"/>
    </Layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import Notes from '@/components/Money/Notes.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from "vue-property-decorator";
  import {recordListModel} from '@/model/recordListModel'
  import {tagListModel} from '@/model/tagListModel'

  const recordList: RecordItem = JSON.parse(window.localStorage.getItem('recordList') || '[]');
  tagListModel.fetch()

  @Component({
    components: {
      Notes,
      NumberPad,
      Types,
      Tags
    }
  })
  export default class Money extends Vue {
    tags: string[] = tagListModel.data;
    recordList: RecordItem[] = recordListModel.fetch();
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0,
    };


    updateTags(value: string[]) {
      this.record.tags = value;
    }

    saveRecord() {
      const record2: RecordItem = recordListModel.clone(this.record);
      record2.createdAt = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordList(){
      recordListModel.save(this.recordList);
    }
  }

</script>
<style lang="scss">
    .money-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
<style lang="scss" scoped>
</style>