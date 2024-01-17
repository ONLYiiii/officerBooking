<template>
  <v-container>
    <v-card style="border-width: 2px; align: center" max-width="100%">
      <div style="background-color: #dadada; height: 50px; display: flex">
        <v-card-title>รายการนัดหมายขอเข้ารับบริการ</v-card-title>
      </div>
      <v-data-table
        v-model="selected"
        :items="items"
        :headers="headers"
        item-value="name"
        show-select
      >
        <template v-slot:item.cancel="{}">
          <v-btn class="text-none ms-4 text-white" color="red" variant="flat"
            >ยกเลิก</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import { mapStores } from "pinia";
import { useBookingDetailsStore } from "@/stores/booking_details";
export default {
  data() {
    return {
      selected: [],
      headers: [
        { title: "รหัสการจอง", value: "BookingID" },
        { title: "ประเภทการจอง", value: "Type" },
        { title: "บริการที่เข้ารับ", value: "Service" },
        { title: "ช่วงเวลา", value: "Time" },
        { title: "วันที่จอง", value: "Date" },
        { title: "ยกเลิกนัดหมาย", key: "cancel", sortable: false },
      ],
      items: [
        {
          BookingID: "123456",
          Type: "โรงเเรม",
          Service: "ขอใบอนุญาติประกอบธุกิจโรงเเรม",
          Time: "บ่าย",
          Date: "13 ธันวาคม 2566",
        },
        {
          BookingID: "123456",
          Type: "โรงเเรม",
          Service: "ขอใบอนุญาติประกอบธุกิจโรงเเรม",
          Time: "บ่าย",
          Date: "13 ธันวาคม 2566",
        },
      ],
    };
  },
  computed: {
    ...mapStores(useBookingDetailsStore),
  },
};
</script>
<style></style>
