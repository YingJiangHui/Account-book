import clone from '@/lib/clone';
const localStorageName = "recordList"

const recordStore = {
  recordList:[] as RecordItem[],
  createRecords(record: RecordItem){
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    this.saveRecords();
  },
  fetchRecords(){
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageName) || '[]') ;
    return this.recordList;
  },
  saveRecords(){
    window.localStorage.setItem(localStorageName,JSON.stringify(this.recordList));
  }
}
recordStore.recordList = recordStore.fetchRecords();
export default recordStore