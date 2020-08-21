<template>
    <Layout>
        <ol class="tags">
            <router-link tag="li" :to="'/labels/edit/'+tag.id" v-for="(tag,index) in tagData" :key="index">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>

        </ol>
        <Button @click="create">新建标签</Button>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import store from '@/store/index2.ts'


  @Component({
    components: {
      Button
    }
  })
  export default class Labels extends Vue {
    tagData = store.tagsList as Tag[];

    create() {
      const name = window.prompt('输入标签名');
      if (!name)
        return;
     store.createTags(name);

    }
  }
</script>

<style lang="scss" scoped>
    .tags {
        background: #fff;
        padding-left: 16px;
        font-size: 16px;

        > li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 44px;
            border-bottom: 1px solid #ddd;

            > svg {
                margin-right: 16px;
                font-size: 18px;
                color: #666;
            }
        }
    }

</style>