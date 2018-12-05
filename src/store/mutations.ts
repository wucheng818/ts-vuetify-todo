import storage from './storage';
import { initEdit } from '../components/type';

export default {
    addData(state: any, data: string) {
      state.dataList.push({
          title: data,
          isChecked: false,
      });
      storage.write('todoList', state.dataList);
    },
    editData(state: any, data: initEdit[]) {
      state.dataList = data;
      storage.write('todoList', data);
    },
    deleteData(state: any, data: initEdit[]) {
      state.dataList = data;
      storage.write('todoList', data);
    },
  };