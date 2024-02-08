<template>
  <div class="mx-10 my-8" justify="center">
    <v-card
      style="max-width: 100%; background-color: rgb(var(--v-theme-primary))"
    >
      <div style="height: 50px; display: flex">
        <v-card-title style="color: white">
          รายการนัดหมายขอเข้ารับบริการ</v-card-title
        >
      </div>
      <v-data-table :items="items" :headers="headers">
        <template v-slot:item.typeWork="{ item }">
          <span>{{ converter("work", item.typeWork) }}</span>
        </template>

        <template v-slot:item.typeService="{ item }">
          <span>{{ converter("service", item.typeService) }}</span>
        </template>

        <template v-slot:item.timeBooking="{ item }">
          <span v-html="converter('time', item.timeBooking)"></span>
        </template>

        <template v-slot:item.dateBooking="{ item }">
          <span>{{ converter("date", item.dateBooking) }}</span>
        </template>

        <template v-slot:item.rcodeDesc="{ item }">
          <span v-html="getPlaceText(item)"></span>
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
          >
            <span>ยกเลิก</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>

  <ConfirmDialog> </ConfirmDialog>
</template>
<script>
import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
  convertStatus,
} from "@/utilities/convertCode.js";
import Swal from "sweetalert2";
import api from "@/api/booking.js";
import { getUserInfoStore } from "@/stores/getter_stores";

export default {
  components: {},
  data() {
    return {
      headers: [
        {
          title: "วันที่",
          key: "dateBooking",
          width: 120,
          align: "center",
          sortable: false,
        },
        {
          title: "ช่วงเวลา",
          key: "timeBooking",
          align: "center",
          width: 120,
          sortable: false,
        },

        {
          title: "ประเภทงาน",
          key: "typeWork",
          align: "start",
          sortable: false,
        },
        {
          title: "งานบริการ",
          key: "typeService",
          align: "start",
          sortable: false,
        },

        {
          title: "สถานที่นัดหมาย",
          key: "rcodeDesc",
          align: "center",
          sortable: false,
        },
        {
          title: "เลขนัดหมาย",
          key: "bookingId",
          align: "center",
          width: 140,
          sortable: false,
        },
        {
          title: "สถานะ",
          key: "status",
          align: "center",
          width: 150,
          sortable: false,
        },
        {
          title: "ยกเลิกนัดหมาย",
          key: "cancel",
          width: 150,
          align: "center",
          sortable: false,
        },
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
          return convertStatus(data);
        default:
          return null;
      }
    },
    cancelBooking(item) {
      Swal.fire({
        title: "ยืนยันการยกเลิกนัดหมาย",
        text: "ต้องการยกเลิกนัดหมายรายการนี้?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const status = await this.putBookingStatus(item);
          if (status === 200) {
            await Swal.fire({
              title: "เเจ้งเตือน",
              text: "ดำเนินการเรียบร้อยเเล้ว",
              icon: "success",
              confirmButtonText: "ปิด",
            });
          } else {
            await Swal.fire({
              title: "เเจ้งเตือน",
              text: "ไม่สามารถยกเลิกได้",
              icon: "error",
              confirmButtonText: "ปิด",
            });
          }
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
      } catch (error) {
        console.error("getCitizenId Error:", error);
      }
    },
    async putBookingStatus(item) {
      try {
        const apiRequest = {
          status: 1,
        };
        const response = await api.putBookingStatus(
          item.rcode,
          item.bookingId,
          item.citizenId,
          apiRequest
        );
        return response.status;
      } catch (error) {
        console.error("error putBookingStatus: ", error);
      }
    },
    getPlaceText(item) {
      if (item.rcodeCcDescription) {
        return `<span>${item.rcodeDescription.description}<br/>${item.rcodeCcDescription.description}</span>`;
      } else {
        return `<span>${item.rcodeDescription.description}<br/>กรุงเทพมหานคร</span>`;
      }
    },
  },
};
</script>
