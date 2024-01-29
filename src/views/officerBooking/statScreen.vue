<template>
  <v-container>
    <v-row class="pt-5" align="center" justify="center">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" md="5" lg="5">
            <vue-date-picker
              v-model="startEndDate"
              label="วันที่นัดหมายเริ่มต้นสิ้นสุด"
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

          <v-col cols="12" md="5" lg="5">
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
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="5" lg="5">
            <div>
              <v-autocomplete
                label="เลือกประเภทงาน"
                v-model="selectedWork"
                :loading="false"
                :items="typework"
                item-title="work"
                item-value="code"
                variant="outlined"
                density="compact"
                base-color="primary"
                color="primary"
                hide-details="auto"
              ></v-autocomplete>
            </div>
          </v-col>
          <v-col cols="12" md="5" lg="5">
            <div>
              <v-autocomplete
                :items="filterService"
                v-model="selectedService"
                item-title="service"
                item-value="code"
                label="เลือกงานบริการ"
                multiple
                chips
                variant="outlined"
                density="compact"
                hide-details="auto"
                @click="handleServiceInput"
              ></v-autocomplete>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <div>
      <data-box
        :grid-cols="gridCols"
        justify="center"
        :box-font-size="boxFontSize"
        :count-rows="amountCount"
        class="mt-6"
      />
    </div>

    <v-card
      style="align: center"
      max-width="100%"
      class="mt-10"
      color="primary"
    >
      <v-row class="pa-1" justify="space-between">
        <v-col>
          <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
        </v-col>
        <v-col class="d-flex justify-end align-center mr-1">
          <v-btn
            class="text-none ms-4"
            color="white"
            variant="flat"
            height="35"
            width="100"
            align="center"
            @click="handlePrint"
            >ส่งออก PDF</v-btn
          >
        </v-col>
      </v-row>

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
      print(this.dataTable, this.startEndDate);
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
  async mounted() {
    await this.getReport();
  },
};
</script>
<style>
.customDatePicker {
  padding-top: 7px;
  padding-bottom: 8px;
}
</style>
