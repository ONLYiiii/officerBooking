<template>
  <v-container>
    <v-card style="border-width: 2px; align: center" max-width="100%">
      <div style="background-color: #dadada; height: 50px; display: flex">
        <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
      </div>
      <v-data-table
        v-model="selected"
        :items="filteredData"
        :headers="headers"
        item-value="name"
      >
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
      </v-data-table>
    </v-card>
    <startup-dialog-vue :count-rows="countRowsNewDate" />
  </v-container>
</template>

<script>
import startupDialogVue from "@/components/officerBooking/startupDialog.vue";
import fakeData from "@/json/fakeData.json";
import { formatDateString, formatDate } from "@/utilities/formatDate";
import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
} from "@/utilities/convertCode.js";
export default {
  components: {
    startupDialogVue,
  },
  data() {
    return {
      headers: [
        { title: "รหัสการจอง", key: "BookingID" },
        { title: "เลขประจำตัวประชาชน ", key: "citizenId" },
        { title: "ประเภทงาน", key: "typeWork" },
        { title: "บริการที่เข้ารับ", key: "typeService" },
        { title: "ช่วงเวลา", key: "timeBooking" },
        { title: "วันที่จอง", key: "dateBooking" },
      ],
      dataTable: fakeData,
    };
  },
  computed: {
    filteredData() {
      const currentDate = formatDate(new Date());

      return this.dataTable.filter((item) => {
        const dateString = formatDateString(item.dateBooking);
        console.log("Date String: " + dateString);
        console.log("Current Date: " + currentDate);
        return dateString === currentDate;
      });
    },
    countRowsNewDate() {
      let totalCount = 0;
      let morningCount = 0;
      let afternoonCount = 0;

      this.filteredData.forEach((item) => {
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
    converter(mode, data) {
      switch (mode) {
        case "work":
          return convertWorkCode(data);
        case "service":
          return convertServiceCode(data);
        case "time":
          return convertTimeBooking(data);
        case "date":
          return convertDate(data);
        default:
          return null;
      }
    },
  },
};
</script>
<style></style>
