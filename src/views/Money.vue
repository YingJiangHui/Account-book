<template>
    <Layout classPrefix="money">
        <NumberPad :value.sync="record.numberPad"/>
        <Types :value.sync="record.type"/>
        <Notes :value.sync="record.notes"/>
        <Tags @update:value="updateTags" :dataSource.sync="tags"/>
        {{record}}
    </Layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import Notes from '@/components/Money/Notes.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from "vue-property-decorator";

  type Record = {
    tags: string[];
    notes: string;
    type: string;
    numberPad: number;
  }
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
    record: Record = {
      tags:[],
      notes:'',
      type:'-',
      numberPad:0
    }

    updateTags(value: string[]) {
      this.record.tags = value
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