<template>
    <Layout classPrefix="money">
        <NumberPad :value.sync="record.amount" @submit="saveRecord" />
        <Types :value.sync="record.type"/>
        <div class="notes">
            <FormItem field-text="备注" placeholder="在这里添加备注" :value.sync="record.notes"/>
        </div>
        <Tags @update:value="update" />
    </Layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import FormItem from '@/components/Money/FormItem.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from "vue-property-decorator";


  @Component({
    components: {
      FormItem,
      NumberPad,
      Types,
      Tags
    }
  })

  export default class Money extends Vue {
    recordList: RecordItem[] = this.$store.state.recordList;
    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0,
    };
    created(): void {
      this.$store.commit('fetchRecords')
    }

    update(value: string[]) {
      this.record.tags = value;
      this.$store.commit('fetchRecords')
    }

    saveRecord() {
      this.$store.commit('createRecords',this.record);
    }
  }

</script>
<style lang="scss">
    .money-content {
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        >{
            background: rgb(245, 245, 245);
        }
        padding: 10px 0 ;
    }
</style>
<style lang="scss" scoped>
</style>