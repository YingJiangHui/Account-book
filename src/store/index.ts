import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[];
  tagsList: Tag[];
  currentTag: Tag|undefined;
}
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagsList: [] as Tag[],
    currentTag:undefined
  } as RootState,
  mutations: {
    setCurrentTag(state,id: string){
      state.currentTag = state.tagsList.find(item => item.id === id);
    },

    createRecords(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || '[]');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },

    createTags(state, name: string) {
      const names = state.tagsList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        alert('标签添加名重复');
        return 'duplicated';
      }
      const id = createId().toString();
      state.tagsList.push({id, name});
      store.commit('saveTags');
      alert('标签添加成功');
      return 'success';
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagsList));
    },
    fetchTags(state) {
      state.tagsList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    updateTags(state: RootState,payload: { id: string; name: string }) {
      const {name,id} = payload
      const tag = state.tagsList.find(el=>el.id===id)
      if (tag) {
        if (name === tag.name) {
          console.log(name)
        } else {
          if (name) {
            tag.name = name;
            store.commit('saveTags');
          }
        }
      }
    },

    removeTags(state, id: string) {
      const tag = state.tagsList.find(el=>el.id===id)
      if (tag) {
        const index = state.tagsList.indexOf(tag);
        state.tagsList.splice(index, 1);
        store.commit('saveTags');
        alert('删除成功');
      }
      return;
    }
  }


});

store.commit('fetchTags')
export default store;
