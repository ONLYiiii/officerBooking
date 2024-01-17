import { defineStore } from "pinia";

export const useStartupDialogStore = defineStore("startupDialog", {
  state: () => {
    return {
      dialog: true,
    };
  },
  actions: {
    closeDialog() {
      this.dialog = false;
    },
  },
});
