
  import storage from './storage';
  import { initEdit } from '../components/type';
  let dataList:initEdit;
  export default {
    dataList: storage.read('todoList'),
  };