const localStorageName = 'tagList';
type TagListModel = {
  data: string[];
  create: (name: string) => 'success' | 'duplicated';
  fetch: () => void;
  save: () => void;

}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
  },
  create(name: string) {
    if(this.data.indexOf(name)>=0){
      return 'duplicated'
    }else{
      this.data.push(name);
      this.save();
      return 'success';
    }

  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  }
};

export {tagListModel};