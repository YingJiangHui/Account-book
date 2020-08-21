type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
  push?(record2: RecordItem): void;
}
type Tag = {
  id: string;
  name: string;
}

type TagListModel = {
  data: Tag[];
  create: (name: string) => 'success' | 'duplicated';
  fetch: () => Tag[];
  save: () => void;
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
  remove: (id: string) => boolean;
  find: (id: string) => Tag|undefined;
}

interface Window {
  tagsList: Tag[];
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: TagListModel['update'];
  findTag: (id: string) => Tag|undefined;
}