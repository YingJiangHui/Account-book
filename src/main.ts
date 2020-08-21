import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {tagListModel} from '@/model/tagListModel';

Vue.component('Icon',Icon);
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.config.productionTip = false;

window.tagsList = tagListModel.fetch();
window.createTag = (name: string)=>{
  const message = tagListModel.create(name);
  if(message==='success'){
    alert('标签添加成功')
  }else if(message ==='duplicated'){
    alert('标签添加名重复')
  }
}
window.removeTag=(id: string)=>{
  return tagListModel.remove(id);
}
window.updateTag=(id: string,name: string)=>{
  return tagListModel.update(id,name);
}
window.findTag=(id: string)=>{
  return tagListModel.find(id);
}
console.log(window.tagsList);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
