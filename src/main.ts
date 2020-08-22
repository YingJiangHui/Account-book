import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
Vue.component('Icon', Icon);
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.config.productionTip = false;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// window.onload = ()=>{
//   // document.querySelector('html').height = window.screen.height;
//   console.log(window.screen.height)
//   setTimeout(()=>{
//     window.scrollTo(0,1000)
//   },0)
// }
