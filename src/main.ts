import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {tagListModel} from '@/model/tagListModel';
import {recordListModel} from '@/model/recordListModel';

Vue.component('Icon', Icon);
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.config.productionTip = false;

window.store = {
  //严重依赖window
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {recordListModel.create(record);},

  tagsList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'success') {
      alert('标签添加成功');
    } else if (message === 'duplicated') {
      alert('标签添加名重复');
    }
  },
  removeTag: (id: string) => tagListModel.remove(id),
  updateTag: (id: string, name: string) => tagListModel.update(id, name),
  findTag: (id: string) => tagListModel.find(id),

};


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
