<template>
  <v-container>
    <v-col>
      <v-row align="center">
        <v-col cols="3">
          <p>สถานนะการนัดหมาย</p>
        </v-col>
        <v-col cols="4">
          <br />
          <v-select
            v-model="selectedStatus"
            label="Select"
            item-title="status"
            item-value="key"
            :items="status"
            variant="outlined"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-card style="border-width: 2px; align: center" max-width="100%">
      <div style="background-color: #dadada; height: 50px; display: flex">
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
    <startup-dialog-vue :count-rows="countRowsNewDate" />
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
      status: statusData,
      headers: [
        { title: "เลขนัดหมาย", key: "bookingId" },
        { title: "เลขประจำตัวประชาชน ", key: "citizenId" },
        { title: "ประเภทงาน", key: "typeWork" },
        { title: "งานบริการ", key: "typeService" },
        { title: "ช่วงเวลา", key: "timeBooking" },
        { title: "วันที่", key: "dateBooking" },
        { title: "สถานะ", key: "status" },
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
        this.dataTable.length = 0;

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
        this.dataTable.push(...resDatas.data.bookingDetail);
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
  async mounted() {
    await this.getRcode();
  },
};
</script>
<style></style>
