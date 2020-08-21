<template>
    <Layout>
        <div class="navBar">
            <Icon name="left" @click="goBack"/>
            <span>编辑标签</span></div>
        <FormItem field-text="备注" placeholder="输入备注" :value="tag.name" @update:value="update"/>
        <Button @click="remove(tag.id)">删除标签</Button>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {FormItem, Button},
    computed:{
      currentTag(){
        return this.$store.state.currentTag;
      }
    }
  })
  export default class EditLabel extends Vue {
    tag?: Tag;

    created(): void {
      this.$store.commit('setCurrentTag',this.$route.params.id);
      if (this.$store.state.currentTag) {
        this.tag = this.$store.state.currentTag;
      } else {
        this.$router.replace('/404');
      }
    }

    update(event: string) {
      if (this.tag)
        this.$store.commit('updateTags',{id:this.tag.id, name:event});
    }

    remove(id: string) {
      this.$store.commit('removeTags',id)
      this.goBack();
    }

    goBack() {
      this.$router.back();
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

    .form-item {
        margin-top: 8px;
        background: #fff;
    }
</style>