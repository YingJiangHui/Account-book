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



if(document.body.clientWidth>500){
  const img = document.createElement('img')
  const cover = document.createElement('div')
  cover.style.background='rgba(0,0,0,0.3)'
  cover.style.position='fixed'
  cover.style.zIndex = '99'
  cover.style.top='0'
  cover.style.left='0'
  cover.style.width='100%'
  cover.style.height='100%'
  img.src = 'a0da55c0d10fb932d69ab5bb1c8c81f4.png'
  img.style.position='fixed'
  img.style.top='50%'
  img.style.left='50%'
  img.style.transform='translate(-50%,-50%)'
  cover.appendChild(img)
  document.querySelector('body')?.appendChild(cover)

}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
