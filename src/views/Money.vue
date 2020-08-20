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
  import {model} from '@/model'


  const recordList: RecordItem = JSON.parse(window.localStorage.getItem('recordList') || '[]');
  @Component({
    components: {
      Notes,
      NumberPad,
      Types,
      Tags
    }
  })

  export default class Money extends Vue {
    tags: string[] = ['衣', '食', '住', '行'];
    recordList: RecordItem[] = model.fetch();
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
      const record2: RecordItem = model.clone(this.record);
      record2.createdAt = new Date();
      this.recordList.push(record2);
    }
    @Watch('recordList')
    onRecordList(){
      model.save(this.recordList);
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