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
    setUser(pid, name) {
      this.userInfo = {
        pid,
        name,
      };
    },
    async fetchUserInfo() {
      try {
        const response = await api.getUserInfo();
        if (response.status === 200) {
          this.userInfo = response.data;
        } else if (response.status === 500) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "500 Internal Server Error",
            icon: "error",
            confirmButtonText: "ปิด",
          });
        } else {
          Swal.fire({
            title: "ไม่สามารถใช้งานระบบได้",
            text: "กรุณา Login เข้าสู่ระบบ",
            icon: "error",
            confirmButtonText: "ปิด",
          });
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
