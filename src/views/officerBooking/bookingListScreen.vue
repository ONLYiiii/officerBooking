<template>
  <div class="mx-10 my-4">
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
      <v-col cols="4">
        <CustomDatePickerVue v-model="startEndDate" :minDate="new Date()" />
      </v-col>
    </v-row>
    <v-card
      align="center"
      justify="center"
      style=" max-width=100%"
      class="mt-2"
      color="primary"
    >
      <v-row class="pa-1" justify="space-between">
        <v-col style="display: flex">
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

      <TableListVue :items="items" :headers="headers"></TableListVue>
    </v-card>
    <startup-dialog-vue :count-rows="amountCount" />
  </div>
</template>

<script>
import startupDialogVue from "@/components/officerBooking/startupDialog.vue";
import TableListVue from "@/components/TableList.vue";
import CustomDatePickerVue from "@/components/officerBooking/CustomDatePicker.vue";
import { getFullDate } from "@/utilities/formatDate";
import { getUserInfoStore } from "@/stores/getter_stores";
import api from "@/api/booking.js";
import statusData from "@/json/statusData.json";
import print from "@/utilities/firstOfficerprint";

export default {
  components: {
    startupDialogVue,
    TableListVue,
    CustomDatePickerVue,
  },
  data() {
    return {
      startEndDate: new Date(),
      selectedStatus: 0,
      status: statusData,
      headers: [
        {
          title: "วันที่",
          key: "dateBooking",
          align: "center",
          sortable: false,
        },
        {
          title: "ช่วงเวลา",
          key: "timeBooking",
          align: "center",
          sortable: false,
        },
        {
          title: "เลขประจำตัวประชาชน ",
          key: "citizenId",
          align: "center",
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
          title: "เลขนัดหมาย",
          key: "bookingId",
          align: "center",
          sortable: false,
        },
        {
          title: "สถานะ",
          key: "status",
          align: "center",
          sortable: false,
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
        let dateStart;
        let dateEnd;
        if (this.startEndDate[0]) {
          dateStart = getFullDate(this.startEndDate[0]);
          dateEnd = getFullDate(this.startEndDate[1]);
        } else {
          dateStart = getFullDate(this.startEndDate);
          dateEnd = getFullDate(this.startEndDate);
        }

        let resDatas = await api.getReport(
          dateStart,
          dateEnd,
          null,
          null,
          this.selectedStatus,
          this.userInfo.rcode
        );

        this.amountCount.totalCount = resDatas.data.amount;
        this.amountCount.morningCount = resDatas.data.timeBooking1;
        this.amountCount.afternoonCount = resDatas.data.timeBooking2;
        this.items.push(...resDatas.data.bookingDetail);
      } catch (error) {
        console.error(error);
      }
    },
    handlePrint() {
      print(this.items, this.startEndDate);
    },
  },
  watch: {
    startEndDate: function () {
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
<style></style>
