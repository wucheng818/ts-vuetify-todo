export interface initDialog {
  title: string;
  content: string;
  saveBtn: string;
  deleteBtn: string;
  index: number;
}
export interface initEdit {
  title: string;
  isChecked: boolean;
}
export interface sendChild {
  dialogData: initDialog,
  isDialog: boolean,
  dataList: initEdit[]
}
export interface stateNumber {
  all: number;
  completeNum: number;
  unCompleted: number;
}
export interface initEdit {
  title: string;
  isChecked: boolean;
}
export interface sendChild {
  dialogData: initDialog,
  isDialog: boolean,
  dataList: initEdit[]
}
