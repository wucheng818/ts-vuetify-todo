import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
interface initEdit {
  title: string;
  isChecked: boolean;
}
interface initState {
  dataList: initEdit[] | [];
}
// localStorage.removeItem('todoList')
const storage = {
  write(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  read<initEdit>(key: string): initEdit | [] {
    const value: string | null = localStorage.getItem(key);
    if (value && value != 'undefined' && value != 'null') {
        return JSON.parse(value) as initEdit;
    }
    return [];
  },
};


const state: initState = {
  dataList: storage.read('todoList'),
};
const actions = {
  addData(context: any, data: string) {
    context.commit('addData', data);
  },
  editData(context: any, data: object[]) {
    context.commit('editData', data);
  },
  deleteData(context: any, data: object[]) {
    context.commit('deleteData', data);
  },
};
const mutations = {
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
export default new Vuex.Store({
  state,
  mutations,
  actions,
});
