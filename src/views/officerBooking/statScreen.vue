<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12">
        <v-row align="center">
          <v-col cols="6" md="2" lg="2">
            <p>ข้อมูลนัดหมายวันที่</p>
          </v-col>
          <v-col cols="12" md="5" lg="5">
            <vue-date-picker
              v-model="startEndDate"
              locale="th-TH"
              :format="formatDatePicker"
              :enable-time-picker="false"
              :start-time="startTime"
              :clearable="false"
              input-class-name="customDatePicker"
              model-auto
              range
            />
          </v-col>
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
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center">
          <v-col cols="12" lg="2">
            <p>เลือกประเภทงานเเละบริการที่ต้องการ</p>
          </v-col>

          <v-col cols="12" lg="5">
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
          <v-col cols="12" lg="5">
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
    </v-row>

    <data-box
      :grid-cols="gridCols"
      justify="center"
      :box-font-size="boxFontSize"
      :count-rows="amountCount"
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
      <!-- <v-data-table :items="dataTable" :headers="headers">
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
      <TableList :items="dataTable" :headers="headers"></TableList>
    </v-card>
  </v-container>
</template>

<script>
//Package Import
import Swal from "sweetalert2";

//JSON Import
import typework from "@/json/typework.json";
import statusData from "@/json/statusData.json";
import service from "@/json/service.json";
// import fakeData from "@/json/fakeData.json";

//Component Import
import TableList from "@/components/TableList.vue";
import dataBox from "@/components/officerBooking/dataBox.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// API Import
import api from "@/api/booking.js";
//Utilities Import
import { getFullDate } from "@/utilities/formatDate";
import print from "@/utilities/officerprint";

//Stores Import
import { getUserInfoStore } from "@/stores/getter_stores";

export default {
  components: {
    dataBox,
    VueDatePicker,
    TableList,
  },
  data() {
    return {
      amountCount: { totalCount: 0, morningCount: 0, afternoonCount: 0 },
      service: service,
      selectedWork: 0,
      selectedService: [],
      typework: typework,
      status: statusData,
      dataTable: [],
      filterService: [],
      startEndDate: new Date(),
      selectedStatus: null,
      startTime: [
        {
          hours: 0,
          minutes: 0,
        },
        {
          hours: 0,
          minutes: 0,
        },
      ],

      headers: [
        { title: "เลขนัดหมาย", key: "bookingId" },
        { title: "เลขประจำตัวประชาชน ", key: "citizenId" },
        { title: "ประเภทงาน", key: "typeWork" },
        { title: "งานบริการ", key: "typeService" },
        { title: "ช่วงเวลา", key: "timeBooking" },
        { title: "วันที่", key: "dateBooking" },
        { title: "สถานะ", key: "status" },
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
        Swal.fire({
          title: "เเจ้งเตือน",
          text: "กรุณาเลือกประเภทงาน",
          icon: "info",
          confirmButtonText: "ปิด",
        });
        this.selectedService.length = 0;
      }
    },
    handlePrint() {
      print(this.filteredData, this.startEndDate);
    },
    // converter(mode, data) {
    //   switch (mode) {
    //     case "work":
    //       return convertWorkCode(data);
    //     case "service":
    //       return convertServiceCode(data);
    //     case "time":
    //       return convertTimeBooking(data);
    //     case "date":
    //       return convertDate(data);
    //     default:
    //       return null;
    //   }
    // },
    // formatDatePicker(date) {
    //   const date1 = date[0] ? formatDate(date[0]) : "";
    //   const date2 = date[1] ? formatDate(date[1]) : "";

    //   if (date.length === 2 && date[1] !== null) {
    //     return `${date1} ถึง ${date2}`;
    //   } else {
    //     return date1;
    //   }
    // },

    async getReport() {
      try {
        this.dataTable.length = 0;
        let dateStart;
        let dateEnd;
        if (this.startEndDate[0]) {
          dateStart = getFullDate(this.startEndDate[0]);
          dateEnd = getFullDate(this.startEndDate[1]);
        } else {
          dateStart = getFullDate(this.startEndDate);
          dateEnd = getFullDate(this.startEndDate);
        }
        const typeService =
          this.selectedService.length > 0 ? this.selectedService : null;

        let resDatas = await api.getReport(
          dateStart,
          dateEnd,
          this.selectedWork,
          typeService,
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
  },

  computed: {
    userInfoStore() {
      return getUserInfoStore();
    },
    userInfo() {
      return this.userInfoStore.userInfo;
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
      this.getReport();
    },
    startEndDate: function () {
      this.getReport();
    },
    selectedService: function () {
      this.getReport();
    },
    selectedStatus: function () {
      this.getReport();
    },
  },
};
</script>
<style>
.customDatePicker {
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
