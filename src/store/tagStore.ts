import {tagListModel} from '@/model/tagListModel';

export default {
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
}