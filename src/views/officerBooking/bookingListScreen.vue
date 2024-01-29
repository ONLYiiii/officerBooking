<template>
  <v-container>
    <v-row align="center">
      <v-col cols="4">
        <br />
        <v-select
          v-model="selectedStatus"
          label="สถานะการนัดหมาย"
          item-title="status"
          item-value="key"
          :items="status"
          variant="outlined"
          density="compact"
          base-color="primary"
          color="primary"
        ></v-select>
      </v-col>
    </v-row>

    <v-card style="align: center" max-width="100%" color="primary">
      <div style="height: 50px; display: flex">
        <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
      </div>
      <!-- <v-data-table :items="filteredData" :headers="headers">
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
      </v-data-table> -->

      <TableListVue :items="items" :headers="headers"></TableListVue>
    </v-card>
    <startup-dialog-vue :count-rows="amountCount" />
  </v-container>
</template>

<script>
// components Import
import startupDialogVue from "@/components/officerBooking/startupDialog.vue";
import TableListVue from "@/components/TableList.vue";
import { getFullDate } from "@/utilities/formatDate";

// import { formatDateString, formatDate } from "@/utilities/formatDate";

// store Import
import { getUserInfoStore } from "@/stores/getter_stores";

// API Import
import api from "@/api/booking.js";

import statusData from "@/json/statusData.json";

export default {
  components: {
    startupDialogVue,
    TableListVue,
  },
  data() {
    return {
      selectedStatus: null,
      status: statusData,
      headers: [
        {
          title: "เลขนัดหมาย",
          key: "bookingId",
          align: "center",
          sortable: false,
          icon: "mdi-order-numeric-descending",
        },
        {
          title: "เลขประจำตัวประชาชน ",
          key: "citizenId",
          align: "center",
          sortable: false,
          icon: "mdi-card-account-details-outline",
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
          align: "center",
          sortable: false,
          icon: "mdi-calendar-month",
        },
        {
          title: "สถานะ",
          key: "status",
          align: "center",
          sortable: false,
          icon: "mdi-list-status",
        },
      ],
      items: [],
      amountCount: { totalCount: 0, morningCount: 0, afternoonCount: 0 },
    };
  },
  computed: {
    userInfoStore() {
      return getUserInfoStore();
    },
    userInfo() {
      return this.userInfoStore.userInfo;
    },
    // filteredData() {
    //   const currentDate = formatDate(new Date());

    //   return this.dataTable.filter((item) => {
    //     const dateString = formatDateString(item.dateBooking);
    //     console.log("Date String: " + dateString);
    //     console.log("Current Date: " + currentDate);
    //     return dateString === currentDate;
    //   });
    // },
    countRowsNewDate() {
      let totalCount = 0;
      let morningCount = 0;
      let afternoonCount = 0;

      this.items.forEach((item) => {
        totalCount++;
        if (item.timeBooking) {
          afternoonCount++;
        } else {
          morningCount++;
        }
      });
      return {
        totalCount,
        morningCount,
        afternoonCount,
      };
    },
  },
  methods: {
    async getReport() {
      try {
        this.items.length = 0;

        let resDatas = await api.getReport(
          getFullDate(new Date()),
          getFullDate(new Date()),
          null,
          null,
          this.selectedStatus,
          this.userInfo.rcode
        );
        console.log(resDatas);
        this.amountCount.totalCount = resDatas.data.amount;
        this.amountCount.morningCount = resDatas.data.timeBooking1;
        this.amountCount.afternoonCount = resDatas.data.timeBooking2;
        this.items.push(...resDatas.data.bookingDetail);
      } catch (error) {
        console.error(error);
      }
    },
    // async getRcode() {
    //   try {
    //     const response = await api.getRcode(this.userInfoStore.userInfo.rcode);
    //     this.items.push(...response.data);
    //   } catch (error) {
    //     console.error("getRcode Error:", error, error);
    //   }
    // },
  },
  watch: {
    selectedStatus: function () {
      this.getReport();
    },
  },
  async mounted() {
    await this.getReport();
  },
};
</script>
<style></style>
