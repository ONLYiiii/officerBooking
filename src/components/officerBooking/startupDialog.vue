<template>
  <v-dialog v-model="dialogModel" persistent content-class="align-center">
    <v-card :width="cardWidth">

      <v-card-title ><center>ข้อมูลนัดหมายประจำวันที่ {{ formatDateComputed }}</center></v-card-title>
      <v-card-text>
        <data-box
          :grid-cols="gridCols"
          :box-font-size="boxFontSize"
          justify="space-evenly"
          :count-rows="countRows"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="red"
          style="font-size: 16px;"
          @click="startupDialogStore.closeDialog()"
          >ปิด</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//Component Import
import dataBox from "@/components/officerBooking/dataBox.vue";
import {formatDate} from "@/utilities/formatDate"
//Stores Import
import { getStartupDialogStore } from "@/stores/getter_stores";

export default {
  components: {
    dataBox,
  },
  props: ["countRows"],
  data() {
    return {
      gridCols: [
        { cols: 12, sm: 4, lg: 3 },
        { cols: 6, sm: 4, lg: 3 },
        { cols: 6, sm: 4, lg: 3 },
      ],
      boxFontSize: {
        lg: "14px",
        md: "15px",
        sm: "15px",
        xs: "13px",
        default: "16px",
      },
    };
  },
  computed: {
    screenOrientation() {
      const orientation =
        this.$vuetify.display.width > this.$vuetify.display.height
          ? "landscape"
          : "portrait";
      return orientation;
    },
    cardWidth() {
      return this.screenOrientation === "landscape" ? "55vw" : "93vw";
    },
    dialogModel: {
      get() {
        return this.startupDialogStore.dialog;
      },
      set() {
        this.startupDialogStore.closeDialog();
      },
    },
    startupDialogStore() {
      return getStartupDialogStore();
    },
    formatDateComputed() {
      return formatDate(new Date());
    }
  },
};
</script>

<style></style>
