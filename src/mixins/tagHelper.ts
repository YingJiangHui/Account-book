import {Component} from 'vue-property-decorator';
import Vue from 'vue';
@Component
export class TagHelper extends Vue{
  createTag() {
    const name = window.prompt('输入标签名');
    if (!name) return;
    this.$store.commit('createTags',name);
  }
}
export default TagHelper;