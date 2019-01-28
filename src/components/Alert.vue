<template>
  <div>
    <v-dialog v-model="isAlert" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">温馨提示:</v-card-title>
        <v-card-text>{{msg}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="close">确定</v-btn>
          <!-- <v-btn color="green darken-1" flat @click="dialog = false">Agree</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Alert extends Vue {
  @Prop() isShowAlert!: boolean;
  @Prop() msg!: string;
  private isAlert: boolean = false;
  @Watch("isShowAlert")
  change() {
    this.isAlert = this.isShowAlert;
  }
  close() {
    this.isAlert = false;
    this.$emit("alertMsg", this.isAlert);
  }
}
</script>
