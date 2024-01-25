<template>
  <v-container>
    <v-card style="border-width: 2px; align: center" max-width="100%">
      <div style="background-color: #dadada; height: 50px; display: flex">
        <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
      </div>
      <v-data-table :items="items" :headers="headers">
        <template v-slot:item.typeWork="{ item }">
          <span>{{ converter("work", item.typeWork) }}</span>
        </template>

        <template v-slot:item.typeService="{ item }">
          <span>{{ converter("service", item.typeService) }}</span>
        </template>

        <template v-slot:item.timeBooking="{ item }">
          <span>{{ converter("time", item.timeBooking) }}</span>
        </template>

        <template v-slot:item.dateBooking="{ item }">
          <span>{{ converter("date", item.dateBooking) }}</span>
        </template>

        <template v-slot:item.rcodeDesc="{ item }">
          <span>{{ item.rcodeDesc }}</span>
        </template>

        <template v-slot:item.status="{ item }">
          <span>{{ converter("status", item.status) }}</span>
        </template>

        <template v-slot:item.cancel="{ item }">
          <v-btn
            class="text-none ms-4 text-white"
            color="red"
            variant="flat"
            @click="cancelBooking(item)"
            :disabled="item.status"
            >ยกเลิก</v-btn
          >
        </template>
      </v-data-table>
      <!-- <TableListVue :items="items" :headers="headers">
        {{ items }}
        <template v-slot:item.rcode="{ item }">
          <span>
            {{ findDistrict(item) }}
          </span>
        </template>

        <template v-slot:item.cancel="{ item }">
          <v-btn
            class="text-none ms-4 text-white"
            color="red"
            variant="flat"
            @click="putBookingStatus(item)"
            >ยกเลิก</v-btn
          >
        </template>
      </TableListVue> -->
    </v-card>
  </v-container>

  <ConfirmDialog> </ConfirmDialog>
</template>
<script>
import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
  convertStatus
} from "@/utilities/convertCode.js";

import { sleep } from "@/utilities/utils.js";

import Swal from "sweetalert2";

// Components Import
import TableListVue from "@/components/TableList.vue";

// API Import
import api from "@/api/booking.js";

// Store Import
import { getUserInfoStore } from "@/stores/getter_stores";

// Json Import
import provinceJson from "@/json/province.json";

export default {
  components: {
    // TableListVue,
  },
  data() {
    return {
      headers: [
        { title: "เลขนัดหมาย", key: "bookingId" },
        { title: "ประเภทงาน", key: "typeWork" },
        { title: "งานบริการ", key: "typeService" },
        { title: "ช่วงเวลา", key: "timeBooking" },
        { title: "วันที่", key: "dateBooking", width: 120 },
        { title: "สถานที่นัดหมาย", key: "rcodeDesc" },
        { title: "สถานะ", key: "status" },
        { title: "ยกเลิกนัดหมาย", key: "cancel", sortable: false },
      ],
      items: [],
    };
  },
  computed: {
    userInfoStore() {
      return getUserInfoStore();
    },
  },
  async mounted() {
    await this.getCitizenId();
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    converter(mode, data) {
      switch (mode) {
        case "work":
          return convertWorkCode(data);
        case "service":
          return convertServiceCode(data);
        case "time":
          return convertTimeBooking(data);
        case "date":
          return convertDate(data + "");
        case "status":
          return convertStatus(data)
        default:
          return null;
      }

    },
    async cancelBooking(item) {
      Swal.fire({
        title: "ยืนยันการลบ",
        text: "คุณต้องการจะลบข้อมูลรายการนี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.putBookingStatus(item);
          await Swal.fire({
            title: "เเจ้งเตือน",
            text: "ระบบยกเลิกรายการจองเรียบร้อยเเล้ว",
            icon: "success",
            confirmButtonText: "ปิด",
          });
          await this.getCitizenId();
        }
      });
    },
    async getCitizenId() {
      this.items.length = 0;
      try {
        const response = await api.getCitizenId(
          this.userInfoStore.userInfo.pid
        );

        this.items.push(...response.data);

        // return response.data;

        // console.log('Items: ',this.items)
        // console.log("response:: ", this.items);
      } catch (error) {
        console.error("getCitizenId Error:", error);
      }
    },
    async putBookingStatus(item) {
      try {
        const apiRequest = {
          status: 1,
        };
        console.log(item);
        await api.putBookingStatus(item.bookingId, item.citizenId, apiRequest);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style></style>
