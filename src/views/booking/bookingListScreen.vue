<template>
  <v-container>
    <v-card
      style="
        align: center;
        max-width: 100%;
        background-color: rgb(var(--v-theme-primary));
      "
    >
      <div style="height: 50px; display: flex">
        <v-card-title style="color: white"
          >รายการนัดหมายขอเข้ารับบริการ</v-card-title
        >
      </div>
      <v-data-table :items="items" :headers="headers">
        <template v-slot:headers="{ columns }">
          <tr>
            <template v-for="(column, index) in columns" :key="index">
              <td>
                <span>
                  <v-icon class="mr-1">{{ column.icon }}</v-icon>
                  {{ column.title }}
                </span>
              </td>
            </template>
          </tr>
        </template>

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
            <span v-if="$vuetify.breakpoint.mdAndUp">ยกเลิก</span>
            <v-icon v-else icon="bin"></v-icon>
          </v-btn>
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
  convertStatus,
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
        {
          title: "เลขนัดหมาย",
          key: "bookingId",
          align: "center",
          sortable: false,
          icon: "mdi-order-numeric-descending",
        },
        {
          title: "ประเภทงาน",
          key: "typeWork",
          align: "center",
          sortable: false,
          icon: "mdi-briefcase-outline",
        },
        {
          title: "งานบริการ",
          key: "typeService",
          align: "center",
          sortable: false,
          icon: "mdi-format-list-bulleted",
        },
        {
          title: "ช่วงเวลา",
          key: "timeBooking",
          align: "center",
          sortable: false,
          icon: "mdi-clock-time-eight",
        },
        {
          title: "วันที่",
          key: "dateBooking",
          width: 120,
          align: "center",
          sortable: false,
          icon: "mdi-calendar-month",
        },
        {
          title: "สถานที่นัดหมาย",
          key: "rcodeDesc",
          align: "center",
          sortable: false,
          icon: "mdi-map-marker",
        },
        {
          title: "สถานะ",
          key: "status",
          align: "center",
          sortable: false,
          icon: "mdi-list-status",
        },
        {
          title: "ยกเลิกนัดหมาย",
          key: "cancel",
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
    getPlaceText(item) {
      return `<span>${item.rcodeDescription.description}<br/>${item.rcodeCcDescription.description}</span>`;
    },
  },
};
</script>
<style></style>
