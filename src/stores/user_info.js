import { defineStore } from "pinia";

import api from "@/api/booking.js";

//* Package Import
import Swal from "sweetalert2";

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
        if (response.status === 401) {
          Swal.fire({
            title: "ผลดำเนินการ",
            text: "ไม่สามารถจัดส่งข้อมูลนัดหมายไปยังอีเมลล์ของท่านได้",
            icon: "error",
            confirmButtonText: "ปิด",
          });
        } else {
          this.userInfo = response.data;
        }
        
     
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    getUserInfo() {
      return this.userInfo;
    },
  },
});
