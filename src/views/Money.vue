<template>
    <Layout classPrefix="money">
        <NumberPad/>
        <Types/>
        <Notes/>
        <Tags :dataSource.sync="tags"/>
    </Layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import Notes from '@/components/Money/Notes.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from "vue-property-decorator";

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