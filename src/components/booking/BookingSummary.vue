<template>
  <div class="ml-5 mt-4" style="line-height: 50px">
    <div style="line-height: 60px">
      <h2 class="Info-custom" :style="{ fontSize: computedFontSize }">
        วันที่ {{ getFormattedDate }}
      </h2>

      <h2 class="Info-custom" :style="{ fontSize: computedFontSize }">
        จังหวัด{{ selectedProvinceTitle }} อำเภอ/เขต{{ selectedDistrictTitle }}
      </h2>

      <h2 class="Info-custom" :style="{ fontSize: computedFontSize }">
        นัดหมายขอเข้ารับบริการ{{ selectedTypeTitle }} :
      </h2>
      <h2 class="Info-custom" :style="{ fontSize: computedFontSize }">
        {{ selectedServiceTitle }}
      </h2>
    </div>
    <v-row class="mt-2">
      <v-col
        cols="6"
        class="d-flex flex-column align-center"
        v-for="(item, index) in btnText"
        :key="index"
      >
        <h2
          class="text-red text-center Info-custom"
          :style="{ fontSize: computedFontSize }"
        >
          <span v-html="item.title"></span>
        </h2>
        <v-btn
          rounded="lg"
          size="x-large"
          width="80%"
          color="#154C8B"
          @click="item.clickEvent"
          :style="{ fontSize: computedButtonFontSize }"
        >
          จองคิว</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    isCodeVisible: Boolean,
    getFormattedDate: String,
    selectedProvinceTitle: String,
    selectedDistrictTitle: String,
    selectedTypeTitle: String,
    selectedServiceTitle: String,
  },
  emits: ["bookMorningTime", "bookAfternoonTime"],
  data() {
    return {};
  },
  computed: {
    btnText() {
      return [
        {
          title: `<p>ช่วงเช้า${
            this.$vuetify.display.mobile ? "<br>" : " "
          }(09.00 - 11.00)</p>`,
          clickEvent: () => this.$emit("bookMorningTime"),
        },
        {
          title: `ช่วงบ่าย${
            this.$vuetify.display.mobile ? "<br>" : " "
          }(13.00 - 15.00)`,
          clickEvent: () => this.$emit("bookAfternoonTime"),
        },
      ];
    },
    computedFontSize() {
      return this.$vuetify.display.smAndDown
        ? "18px"
        : this.$vuetify.display.mdAndDown
        ? "19px"
        : "20px";
    },
    computedButtonFontSize() {
      return this.$vuetify.display.smAndDown
        ? "18px"
        : this.$vuetify.display.mdAndDown
        ? "19px"
        : "20px";
    },
  },
};
</script>
<style></style>
