<template>
    <Layout>
        <ol class="tags">
            <li v-for="(tag,index) in tagData" :key="index">
                <span>{{tag}}</span>
                <Icon name="right"/>
            </li>

        </ol>
        <div class="createTag-wrapper">
            <button @click="createTag" class="createTag">新增标签</button>
        </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {tagListModel} from '@/model/tagListModel.ts';
  import {Component} from 'vue-property-decorator';

  tagListModel.fetch();

  @Component
  export default class Labels extends Vue {
    tagData = tagListModel.data;
    createTag() {
      const name = window.prompt('输入标签名');
      if (name) {
        const message = tagListModel.create(name);
        if (message === 'success') {
          window.alert('标签添加成功');
        } else if (message === 'duplicated') {
          window.alert('标签添加重复了');
        }
      }
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

    .createTag {
        border-radius: 4px;
        height: 40px;
        padding: 0 16px;
        border: none;
        background: #767676;
        color: white;

        &-wrapper {
            padding: 16px;
            text-align: center;
            margin: 44-16px;
        }
    }
</style>