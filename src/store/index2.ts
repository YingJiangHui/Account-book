import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';
export default {
  ...recordStore,
  ...tagStore
}
