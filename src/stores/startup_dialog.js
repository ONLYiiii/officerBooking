import { defineStore } from "pinia";
import { getUserInfoStore } from "@/stores/getter_stores";

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
  getters: {
    dialogComputed: (state) => {
      const userInfoStore = getUserInfoStore();
      if (userInfoStore.userInfo) {
        return state.dialog;
      } else {
        return false;
      }
    },
  },
});
