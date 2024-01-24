<template>
  <!-- <v-data-table :items="tableItems" :headers="tableHeaders">
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

    <slot></slot>
  </v-data-table> -->
   <v-data-table :items="tableItems" :headers="tableHeaders">

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
    
        <template v-slot:item.cancel="{ item }">
          <v-btn
            class="text-none ms-4 text-white"
            color="red"
            variant="flat"
            @click="cancelBooking(item)"
            >ยกเลิก</v-btn
          >
        </template>
  </v-data-table>
</template>

<script>
//* Utilities Import
import {
  convertWorkCode,
  convertServiceCode,
  convertTimeBooking,
  convertDate,
} from "@/utilities/convertCode.js";

export default {
  props: ["items", "headers"],
  data() {
    return {
      tableItems: this.items,
      tableHeaders: this.headers,
    }
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
          return convertDate(data + '');
        default:
          return null;
      }
    },
  },
};
</script>
