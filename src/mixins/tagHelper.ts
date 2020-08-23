import {Component} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export class TagHelper extends Vue {


  createTag() {
    const name = window.prompt('输入标签名');
    if (!name) return;
    this.$store.commit('createTags', name);
    if (this.$store.state.currentState === 'success') {
      alert('添加成功');
    } else if (this.$store.state.currentState === 'duplicated') {
      alert('存在重複標簽');
    }
  }
}

export default TagHelper;