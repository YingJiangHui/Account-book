import createId from '@/lib/createId';
const localStorageName = 'tagList';


const tagList ={
  tagsList:[] as Tag[],
  createTags(name: string) {
    const names = this.tagsList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      alert('标签添加名重复');

      return 'duplicated';
    }
    const id = createId().toString()
    this.tagsList.push({id, name});
    this.saveTags();
    alert('标签添加成功');
    return 'success';
  },
  saveTags() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.tagsList));
  },
  fetchTags() {
    this.tagsList = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    return this.tagsList;
  },
  updateTags(id: string, name: string) {
    const tag = this.findTags(id);
    if (tag) {
      if (name === tag.name) {
        return 'duplicated';
      }else{
        if(name){
          tag.name =  name;
          this.saveTags();
          return 'success';
        }
      }
    }
    return 'not found';
  },
  findTags(id: string){
    return this.tagsList.find(item => item.id === id);
  },
  removeTags(id: string){
    const tag = this.findTags(id);
    if(tag){
      const index = this.tagsList.indexOf(tag);
      this.tagsList.splice(index,1);
      this.saveTags()
      return true;
    }
    return false;
  },
}

tagList.tagsList = tagList.fetchTags()

export default tagList