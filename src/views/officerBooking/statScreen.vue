<template>
  <v-container>
    <v-col align-content="center" class="pa-5">
      <v-row no-gutters align="center">
        <v-col cols="2">
          <p>ข้อมูลนัดหมายวันที่</p>
        </v-col>
        <v-col cols="3">
          <vue-date-picker
            v-model="startEndDate"
            :format="formatDatePicker"
            :enable-time-picker="false"
            model-auto
            range
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="2">
          <p>เลือกประเภทงานเเละบริการที่ต้องการ</p>
        </v-col>

        <v-col cols="12" md="5">
          <div>
            <br />
            <v-autocomplete
              label="เลือกประเภทงาน"
              v-model="selectedWork"
              :loading="false"
              :items="typework"
              item-title="work"
              item-value="code"
              variant="outlined"
            ></v-autocomplete>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <div>
            <br />
            <v-autocomplete
              :items="filterService"
              v-model="selectedService"
              item-title="service"
              item-value="code"
              label="เลือกงานบริการ"
              multiple
              chips
              variant="outlined"
              @click="handleServiceInput"
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <data-box
      :grid-cols="gridCols"
      justify="center"
      :box-font-size="boxFontSize"
      :count-rows="countRows"
    />

    <v-card
      style="border-width: 2px; align: center"
      max-width="100%"
      class="mt-10"
    >
      <v-row
        class="pa-1"
        justify="space-between"
        style="background-color: #dadada"
      >
        <v-col>
          <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
        </v-col>
        <v-col class="d-flex justify-end mr-1">
          <v-btn
            class="text-none ms-4 text-white"
            color="red"
            variant="flat"
            height="45"
            width="70"
            align="center"
            @click="handlePrint"
            >พิมพ์</v-btn
          >
        </v-col>
      </v-row>
      <v-data-table
        v-model="selected"
        :items="filteredData"
        :headers="headers"
        item-value="name"
        class
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
  </v-container>
</template>
<script>
//Package Import
import Swal from "sweetalert2";
//JSON Import
import typework from "@/json/typework.json";
import service from "@/json/service.json";
import fakeData from "@/json/fakeData.json";
//Component Import
import dataBox from "@/components/officerBooking/dataBox.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
//Utilities Import
import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
} from "@/utilities/convertCode.js";
import { formatDate } from "@/utilities/formatDate";
import print from "@/utilities/officerprint";
export default {
  components: {
    dataBox,
    VueDatePicker,
  },
  data() {
    return {
      service: service,
      selectedWork: 0,
      selectedService: [],
      typework: typework,
      dataTable: fakeData,
      filterService: [],
      startEndDate: null,

      headers: [
        { title: "รหัสการจอง", key: "BookingID" },
        { title: "เลขประจำตัวประชาชน ", key: "citizenId" },
        { title: "ประเภทงาน", key: "typeWork" },
        { title: "บริการที่เข้ารับ", key: "typeService" },
        { title: "ช่วงเวลา", key: "timeBooking" },
        { title: "วันที่จอง", key: "dateBooking" },
      ],
      gridCols: [
        { cols: 12, sm: 4, lg: 2 },
        {
          cols: 6,
          sm: 4,
          lg: 2,
        },
        {
          cols: 6,
          sm: 4,
          lg: 2,
        },
      ],
      boxFontSize: {
        lg: "14px",
        md: "16px",
        sm: "16px",
        xs: "14px",
        default: "16px",
      },
    };
  },
  methods: {
    handleServiceInput() {
      if (!this.selectedWork) {
        Swal.fire("กรุณาเลือกประเภทงานที่ต้องการ");
        this.selectedService.length = 0;
      }
    },
    handlePrint() {
      print(this.filteredData);
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
          return convertDate(data);
        default:
          return null;
      }
    },
    formatDatePicker(date) {
      const date1 = formatDate(date[0]);
      const date2 = formatDate(date[1]);

      return `${date1} ถึง ${date2}`;
    },
  },
  computed: {
    filteredData() {
      if (this.selectedWork === 0) {
        return this.dataTable;
      } else if (this.selectedService.length !== 0) {
        return this.dataTable.filter(
          (item) =>
            item.typeWork === this.selectedWork &&
            this.selectedService.includes(item.typeService)
        );
      } else {
        return this.dataTable.filter(
          (item) => item.typeWork === this.selectedWork
        );
      }
    },
    countRows() {
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
  watch: {
    selectedWork: function () {
      //-----------------------------------------------------
      const typeCode = `${this.selectedWork > 9 ? "" : "0"}${
        this.selectedWork
      }`;
      if (this.selectedWork) {
        this.filterService = this.service.filter((value) => {
          return value.code.startsWith(typeCode);
        });
      }
      //-----------------------------------------------------
      this.selectedService.length = 0;
    },
  },
};
</script>
<style></style>
