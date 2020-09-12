<template>
    <Layout>
        <NotContent v-if="tagData.length===0">沒有任何標簽...</NotContent>
        <ol class="tags">
            <router-link
                    tag="li"
                    :to="'/labels/edit/'+tag.id"
                    v-for="(tag,index) in tagData"
                    :key="index">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>

        </ol>
        <Button @click="createTag">新建标签</Button>
    </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import TagHelper from '@/mixins/tagHelper.ts';
  import NotContent from '@/components/NotContent.vue';

  @Component({
    components: {
      NotContent,
      Button
    }
  })
  export default class Labels extends mixins(TagHelper) {
    get tagData() {
      return this.$store.state.tagsList as Tag[];

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