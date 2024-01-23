<template>
  <v-container>
    <v-card style="border-width: 2px; align: center" max-width="100%">
      <div style="background-color: #dadada; height: 50px; display: flex">
        <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
      </div>
      <!-- <v-data-table :items="items" :headers="headers">
        <template v-slot:item.cancel="{ item }">
          <v-btn
            class="text-none ms-4 text-white"
            color="red"
            variant="flat"
            @click="cancelBooking(item)"
            >ยกเลิก</v-btn
          >
        </template>
      </v-data-table> -->
      <TableListVue :items="items" :headers="headers">
        <template v-slot:item.cancel="{ item }">
          <v-btn
            class="text-none ms-4 text-white"
            color="red"
            variant="flat"
            @click="putBookingStatus(item)"
            >ยกเลิก</v-btn
          >
        </template>
      </TableListVue>
    </v-card>
  </v-container>
</template>
<script>
import Swal from "sweetalert2";

// Components Import
import TableListVue from "@/components/TableList.vue";

// API Import
import api from "@/api/booking.js";

import { getUserInfoStore } from "@/stores/getter_stores";

export default {
  components: {
    TableListVue,
  },
  data() {
    return {
      headers: [
        { title: "รหัสการจอง", value: "bookingId" },
        { title: "ประเภทการจอง", value: "typeWork" },
        { title: "บริการที่เข้ารับ", value: "typeService" },
        { title: "ช่วงเวลา", value: "timeBooking" },
        { title: "วันที่จอง", value: "dateBooking" },
        { title: "ยกเลิกนัดหมาย", key: "cancel", sortable: false },
      ],
      items: [],
    };
  },
  computed: {
    userInfoStore() {
      return getUserInfoStore();
    },

    userInfo() {
      return this.userInfoStore.userInfo;
    },
  },
  async created() {
    await api.getCitizenId();
  },
  methods: {
    async cancelBooking() {
      Swal.fire({
        title: "เเจ้งเตือน",
        text: "ระบบยกเลิกรายการจองเรียบร้อยเเล้ว",
        icon: "success",
        confirmButtonText: "ปิด",
      });
      await this.getCitizenId();
    },
    async getCitizenId() {
      this.items.length = 0;
      try {
        const response = await api.getCitizenId(this.userInfo.pid);
        console.log("response:: ", response);
        this.items.push(...response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async putBookingStatus(item) {
      const apiRequest = {
        status: 0,
      };
      const response = await api.putBookingStatus(
        item.bookingId,
        item.citizenId,
        apiRequest
      );
      const statusCode = response.status;
      if (statusCode === 200) {
        await this.cancelBooking();
      }
    },
  },
};
</script>
<style></style>
