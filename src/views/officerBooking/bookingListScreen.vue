<template>
  <v-container>
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
// import fakeData from "@/json/fakeData.json";
// import { formatDateString, formatDate } from "@/utilities/formatDate";

// store Import
import { getUserInfoStore } from "@/stores/getter_stores";

// API Import
import api from "@/api/booking.js";

export default {
  components: {
    startupDialogVue,
    TableListVue,
  },
  data() {
    return {
      headers: [
        { title: "รหัสการจอง", key: "bookingId" },
        { title: "เลขประจำตัวประชาชน ", key: "citizenId" },
        { title: "ประเภทงาน", key: "typeWork" },
        { title: "บริการที่เข้ารับ", key: "typeService" },
        { title: "ช่วงเวลา", key: "timeBooking" },
        { title: "วันที่จอง", key: "dateBooking" },
      ],
      items: [],
    };
  },
  computed: {
    userInfoStore() {
      return getUserInfoStore();
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
    async getRcode() {
      try {
        const response = await api.getRcode(this.userInfoStore.userInfo.rcode);
        this.items.push(...response.data);
      } catch (error) {
        console.error("getRcode Error:", error, error);
      }
    },
  },
  async mounted() {
    await this.getRcode();
  },
};
</script>
<style></style>
