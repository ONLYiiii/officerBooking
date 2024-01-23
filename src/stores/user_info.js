import { defineStore } from "pinia";

import api from "@/api/booking.js";

export const useUserInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      userInfo: null,
    };
  },
  actions: {
    async fetchUserInfo() {
      try {
        const response = await api.getUserInfo();
        this.userInfo = response.data;
     
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    getUserInfo() {
      return this.userInfo;
    },
  },
});
