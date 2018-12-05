export default {
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