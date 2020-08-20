import createId from '@/lib/createId';

const localStorageName = 'tagList';
type Tag = {
  id: string;
  name: string;
}

type TagListModel = {
  data: Tag[];
  create: (name: string) => 'success' | 'duplicated';
  fetch: () => void;
  save: () => void;
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
  remove: (id: string) => 'success'|'not found';
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
  },
  create(name: string) {
    const names = this.data.map((item) => item.name);

    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    const id = createId().toString()
    this.data.push({id: id, name: name});
    this.save();
    return 'success';
  },
  update(id: string, name: string) {
    const tag = this.data.find(item => item.id === id);
    if (tag) {
      if (name === tag.name) {
        return 'duplicated';
      }else{
        if(name){
          tag.name =  name;
          this.save();
          return 'success';
        }
      }
    }
    return 'not found';
  },

  remove(id){
    const tag = this.data.find(item => item.id === id);
    if(tag){
      const index = this.data.indexOf(tag);
      this.data.splice(index,1);
      this.save()
      alert('删除成功')
      return 'success';
    }
    return 'not found';
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  }
};

export {tagListModel};