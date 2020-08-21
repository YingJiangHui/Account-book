import createId from '@/lib/createId';

const localStorageName = 'tagList';

const tagListModel: TagListModel = {
  data: [] as Tag[],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    return this.data;
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
  find(id: string){
    return this.data.find(item => item.id === id);
  },
  remove(id){
    const tag = this.find(id);
    if(tag){
      const index = this.data.indexOf(tag);
      this.data.splice(index,1);
      this.save()
      return true;
    }
    return false;
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  }
};

export {tagListModel};