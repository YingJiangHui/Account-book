<template>
    <Layout>
        <div class="navBar"><Icon name="left" @click="goBack"/><span>编辑标签</span></div>
        <FormItem  field-text="备注" placeholder="输入备注" :value="tag.name" @update:value="updateTag"/>
        <Button @click="removeTag(tag.id)">删除标签</Button>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {tagListModel} from '@/model/tagListModel'
  import FormItem from '@/components/Money/FormItem.vue'
  import Button from '@/components/Button.vue'
  @Component({
    components: {FormItem,Button},
  })
  export default class EditLabel extends Vue {
    tag?: {id: string;name: string}=undefined;
    created(): void {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag =  tags.filter(el=>el.id === id)[0]
      if(tag){
        this.tag = tag;
      }else{
        this.$router.replace('/404')
      }
    }
    updateTag(event: string){
        tagListModel.update(this.tag.id,event);
    }
    removeTag(id: string){
      tagListModel.remove(id);
      this.goBack();
    }
    goBack(){
      this.$router.back();
    }
  }

</script>
<style lang="scss" scoped>
.navBar{
    line-height: 48px;
    min-height: 48px;
    position: relative;
    text-align: center;
    background: #fff;
    > svg{
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
    }

}
    .form-item{
        margin-top: 8px;
        background: #fff;
    }
</style>