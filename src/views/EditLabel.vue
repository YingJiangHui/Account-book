<template>
    <Layout>
        <div class="navBar">
            <Icon name="left" @click="goBack"/>
            <span>编辑标签</span></div>
        <FormItem field-text="备注" placeholder="输入备注" :value="currentTag.name" @update:value="update"/>
        <Button @click="remove(currentTag.id)">删除标签</Button>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {FormItem, Button},
  })
  export default class EditLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }
    get commitState(){
      return this.$store.state.currentState;
    }
    created(): void {
      this.$store.commit('setCurrentTag', this.$route.params.id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.currentTag&&this.$store.getters.getIsUpdate)
        this.$store.commit('updateTags',  {id:this.currentTag.id, name});
    }

    remove(id: string) {
      this.$store.commit('removeTags', id);
      if(this.commitState === 'success'){
        alert('删除成功');
      }else{
        alert('删除失敗');
        throw this.commitState
      }
      this.$router.back();
    }

    goBack() {
      if(this.$store.getters.getIsUpdate){
        this.$router.back();
      }else{
        alert('标签名存在重复')
      }
    }
  }

</script>

<style lang="scss" scoped>
    .navBar {
        line-height: 48px;
        min-height: 48px;
        position: relative;
        text-align: center;
        background: #fff;

        > svg {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
        }

    }
    .icon{
        fill:#ffb200;
    }
    .form-item {
        margin-top: 8px;
        background: #fff;
    }
</style>