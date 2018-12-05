<template>
  <div>
    <v-list subheader>  
      <v-list-tile class="list" :key="i" v-for="(item,i) in storeData">
        <v-list-tile-action @click.stop="completed(item, i)">
          <v-checkbox v-model="item.isChecked"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title :class="item.isChecked===false ? 'unCompleted' : 'completed'">{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
        <v-btn icon @click.stop="editData(item,i)">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-list-tile>
    </v-list>
    <TestDialog :sendChildData="sendChildData" @sendSwatch="getSwatch"></TestDialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { initDialog , initEdit, sendChild } from './type';

@Component({
  components:{
      TestDialog:()=>import('./TestDialog.vue')
  }
})
export default class TodoList extends Vue{
  private dataList: initEdit[] = [];
  private rules: object = {
    length: (len: any) => (v: any) => (v || '').length <= len || '长度超过限制,不能保存',
  };
  private alertMsg: boolean = false;
  private input_text: string = '';
  private warningMsg: string = '';
  private dialogData: initDialog = {
    title: '任务编辑',
    content: '',
    saveBtn: '保存任务',
    deleteBtn: '删除任务',
    index: -1,
  };
  private isDialog:boolean= false;
  private sendChildData: sendChild = {
    dialogData:{
    title: '任务编辑',
    content: '',
    saveBtn: '保存任务',
    deleteBtn: '删除任务',
    index: -1,
    },
    isDialog:false,
    dataList:[]
  }
  get storeData(): initEdit[] {
    this.dataList = this.$store.state.dataList;
    this.sendChildData.dataList= this.$store.state.dataList;

    return this.$store.state.dataList;
  }
  getSwatch(data: boolean){
    this.sendChildData.isDialog=data;
  }
  private async editData(item: any, i: number) {
    this.sendChildData.dialogData = await {
      title: '任务修改',
      content: item.title,
      saveBtn: '保存任务',
      deleteBtn: '删除任务',
      index: i,
    }
    this.sendChildData.isDialog= true;
  }
  private async completed(item: any, i: number) {
    this.dataList[i].isChecked = await item.isChecked;
    this.$store.dispatch('editData', this.dataList);
  }
}
</script>
<style scoped>

.list{
  background:#efefef;
  margin:1px 0;
}
.unCompleted{
  text-decoration: none;
  color: #0f1113
}
.completed{
  text-decoration: line-through;
  color:#ccc;
}
.headline{
  font-size: 15px!important;
}
</style>