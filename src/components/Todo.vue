<template>
  <div>
    <v-app id="inspire">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-toolbar class="nav" color="black" dark height="40">
              <p>{{sum.all}}个任务，{{sum.completeNum}}个已完成</p>
              <!-- <p>10个任务，5个已完成</p> -->
            </v-toolbar>
          </v-card>
          <v-card class="body">
            <TodoList></TodoList>
            <div v-show="sum.all===0">
              <img class="nodata" src="@/assets/nodata.png">
              <p>暂无数据</p>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { initEdit, stateNumber } from "./type";

@Component({
  components: {
    TodoList: () => import("./TodoList.vue")
  }
})
export default class Todo extends Vue {
  private dataList: initEdit[] = [];
  private sum: stateNumber = {
    all: 0,
    completeNum: 0,
    unCompleted: 0
  };
  created() {
    this.dataList = this.$store.state.dataList;
  }
  @Watch("dataList", { deep: true })
  public change() {
    this.getNum();
  }
  private async getNum() {
    let all: number = 0;
    let comp: number = 0;
    let unComp: number = 0;
    await this.dataList.forEach(item => {
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
  }
}
</script>
<style scoped>
.nav p {
  margin: 0 auto;
}
.body {
  height: 95%;
  overflow: auto;
}
.nodata {
  width: 100%;
  padding: 10%;
}
</style>