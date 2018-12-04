<template>
  <v-app id="inspire">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar class="nav" color="black" dark height=40>
            <p>{{sum.all}}个任务，{{sum.completeNum}}个已完成</p>
          </v-toolbar>
        </v-card>
        <v-card class="body">
          <v-list subheader>  
            <v-list-tile class="list" :key="i" v-for="(item,i) in storeData">
              <v-list-tile-action @click="completed(item, i)">
                <v-checkbox v-model="item.isChecked"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title :class="item.isChecked===false ? 'unCompleted' : 'completed'">{{item.title}}</v-list-tile-title>
              </v-list-tile-content>
              <v-btn icon @click="editData(item,i)">
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-list-tile>
          </v-list>
          <v-dialog
            v-model="dialog"
            width="500"
            class="dialog"
          >
            <v-btn
              slot="activator"
              color="red lighten-2"
              dark
              fab
              @click="addData"
            >
              <v-icon>add</v-icon>
            </v-btn>
      
            <v-card>
              <v-card-title
                class="headline dialog-head black"
            
              >
                <span>{{dialogData.title}}</span>
              </v-card-title>
      
              <v-card-text>
                <v-textarea
                :rules="[rules.length(20)]"
                v-model="dialogData.content"
                counter="20" full-width placeholder="请输入任务">
                </v-textarea>
              </v-card-text>
      
              <v-divider></v-divider>
      
              <v-card-actions>
               
                <v-btn block color="info"  dark @click="saveData">{{dialogData.saveBtn}}</v-btn>
                <v-btn block color="error" dark @click="deleteData">{{dialogData.deleteBtn}}</v-btn>
                <v-btn block color="error" dark v-show="dialogData.index===-1 ? false : true" @click="cancle">取消修改</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="alertMsg" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">温馨提示：</v-card-title>
              <v-card-text>{{warningMsg}}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="alertMsg = false">确定</v-btn>
                <!-- <v-btn color="green darken-1" flat @click="dialog = false">Agree</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>  
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
interface initDialog {
  title: string;
  content: string;
  saveBtn: string;
  deleteBtn: string;
  index: number;
}
interface initEdit {
  title: string;
  isChecked: boolean;
}
interface stateNumber {
  all: number;
  completeNum: number;
  unCompleted: number;
}
@Component({})
export default class Todo extends Vue {
  get storeData(): initEdit[] {
    this.dataList = this.$store.state.dataList;
    console.log(this.$store.state.dataList);

    return this.$store.state.dataList;
  }
  // private isEdit: boolean=false;
    public dataList: initEdit[] = [];
  private rules: object = {
    length: (len: any) => (v: any) => (v || '').length <= len || '长度超过限制,不能保存',
  };
  private sum: stateNumber = {
    all: 0,
    completeNum: 0,
    unCompleted: 0,
  };
  private alertMsg: boolean = false;
  private dialog: boolean = false;
  private input_text: string = '';
  private warningMsg: string = '';
  private dialogData: initDialog = {
    title: '任务编辑',
    content: '',
    saveBtn: '保存任务',
    deleteBtn: '删除任务',
    index: -1,
  };
  @Watch('dataList', {deep: true})
    public change() {
      this.getNum();
    }
  public mounted() {
    // this.getNum();
  }
  private async saveData() {
    if (this.dialogData.index != -1) {     //  编辑状态
        this.dataList[this.dialogData.index].title = await this.dialogData.content;
        this.dialog = false;
        this.dialogData.content = '';
        this.$store.dispatch('editData', this.dataList);
    } else {   // 新增状态
      if (this.dialogData.content === '') {
        this.warningMsg = '任务栏不能为空';
        this.alertMsg = true;
        return;
      }
      if (this.dialogData.content.length > 20) {
        this.warningMsg = '内容超过限制';
        this.alertMsg = true;
        return;
      }
      // if(this.rules){

      // }
      await this.$store.dispatch('addData', this.dialogData.content);
      this.dialog = false;
      this.dialogData.content = '';
    }

  }
  private async addData() {
     this.dialogData = await {
      title: '任务新增',
      content: '',
      saveBtn: '保存任务',
      deleteBtn: '取消新增',
      index: -1,
    };
  }
  private async editData(item: any, i: number) {
    this.dialogData = await {
      title: '任务修改',
      content: item.title,
      saveBtn: '保存任务',
      deleteBtn: '删除任务',
      index: i,
    };
    this.dialog = true;
  }
  private deleteData() {
    if (this.dialogData.index === -1) {
      this.dialog = false;
    } else {
      this.dataList.splice(this.dialogData.index, 1);
      this.$store.dispatch('deleteData', this.dataList);
      this.dialog = false;
    }
  }
  private cancle() {
    this.dialog = false;
    this.dialogData.content = '';
  }
  private async completed(item: any, i: number) {
    this.dataList[i].isChecked = await item.isChecked;
    this.$store.dispatch('editData', this.dataList);
  }
  private async getNum() {
    let all: number = 0;
    let comp: number = 0;
    let unComp: number = 0;
    await this.dataList.forEach((item) => {
      all++;
      if (item.isChecked) {
        comp++;
      } else {
        unComp++;
      }
    });
    this.sum.all = all;
    this.sum.completeNum = comp;
    this.sum.unCompleted = unComp;
    all = 0;
    comp = 0;
    unComp = 0;
    console.log(this.sum);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav p{
  margin:0 auto;
}
.body{
  height:95%;
  overflow: auto;
}
.body .list{
  background:#efefef;
  margin:1px 0;
}
.addTask{
  position:absolute;
  top:-50%!important;
}
.dialog{
  position: absolute;
  bottom: 5%;
  right: 10%;
}
.dialog-head{
  height:40px;
}
.dialog-head span{
  color:white;
  margin: 0 auto;
  font-size:16px;
}
.v-card__text{
  padding:0;
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
