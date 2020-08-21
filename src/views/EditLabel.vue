<template>
    <Layout>
        <div class="navBar"><Icon name="left" @click="goBack"/><span>编辑标签</span></div>
        <FormItem  field-text="备注" placeholder="输入备注" :value="tag.name" @update:value="update"/>
        <Button @click="remove(tag.id)">删除标签</Button>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue'
  import Button from '@/components/Button.vue'
  @Component({
    components: {FormItem,Button},
  })
  export default class EditLabel extends Vue {
    tag?: Tag;
    created(): void {
      const tag =  window.findTag(this.$route.params.id)
      if(tag){
        this.tag = tag;
      }else{
        this.$router.replace('/404')
      }
    }
    update(event: string){
      if(this.tag)
        window.updateTag(this.tag.id,event);
    }
    remove(id: string){
      window.removeTag(id);
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