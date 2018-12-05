<template>
  <div>
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
    <Alert :msg="msg" :isShowAlert="isShowAlert" @alertMsg="getAlertMsg"></Alert>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { initDialog , initEdit, stateNumber , sendChild} from './type';
@Component({
  components:{
    Alert:()=>import('./Alert.vue')
  }
})
export default class TestDialog extends Vue{
  @Prop() sendChildData!:sendChild;
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
  private dataList: initEdit[] =[];
  private dialogData:initDialog = {
    title: '任务新增',
    content: '',
    saveBtn: '保存任务',
    deleteBtn: '取消新增',
    index: -1,
  }
  private isShowAlert : boolean = false;
  private msg : string = ''
  @Watch('sendChildData',{deep:true})
  changeData(){
    this.dialog = this.sendChildData.isDialog;
    this.dialogData = this.sendChildData.dialogData;
    this.dataList = this.sendChildData.dataList;
  }
  @Watch('dialog')
  emited(){
    this.$emit('sendSwatch',this.dialog);
  }


  private async addData() {
     this.sendChildData.dialogData = await {
      title: '任务新增',
      content: '',
      saveBtn: '保存任务',
      deleteBtn: '取消新增',
      index: -1,
    };
  }
  private async saveData() {
    if (this.dialogData.content === '') {
        this.msg = '任务栏不能为空';
        this.isShowAlert = true;
        return;
      }
      if (this.dialogData.content.length > 20) {
        this.msg = '内容超过限制';
        this.isShowAlert = true;
        return;
      }
    if (this.dialogData.index != -1) {     //  编辑状态
        this.dataList[this.dialogData.index].title = await this.dialogData.content;
        this.sendChildData.isDialog = false;
        this.dialogData.content = '';
        this.$store.dispatch('editData', this.dataList);
    } else {   // 新增状态
      await this.$store.dispatch('addData', this.dialogData.content);
      this.sendChildData.isDialog = false;
      this.dialogData.content = '';
    }

  }
  // 获取alert组件传回来的值
  private getAlertMsg(data: boolean){
    this.isShowAlert= data;
  }
  private deleteData() {
    if (this.dialogData.index === -1) {
      this.sendChildData.isDialog = false;
    } else {
      this.dataList.splice(this.dialogData.index, 1);
      this.$store.dispatch('deleteData', this.dataList);
      this.sendChildData.isDialog = false;
    }
  }
  private cancle() {
    this.sendChildData.isDialog = false;
    this.dialogData.content = '';
  }
}
</script>
<style scoped>
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
.headline{
  font-size: 15px!important;
}
</style>