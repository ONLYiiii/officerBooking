<template>
  <div class="ml-5">
    <div style="line-height: 50px">
      <h2 class="Info-custom" :style="{ fontSize: computedFontSize }">
        วันที่ {{ getFormattedDate }}
      </h2>

      <h2 class="Info-custom" :style="{ fontSize: computedFontSize }">
        {{selectedProvince === '10' ? '' : 'จังหวัด'}}{{ selectedProvinceTitle }} {{selectedProvince === '10' ? '' : 'อำเภอ'}}{{ selectedDistrictTitle }}
      </h2>

      <h2 class="Info-custom" :style="{ fontSize: computedFontSize }">
        <span v-if="!$vuetify.display.mobile">นัดหมายขอเข้ารับบริการ : </span>
        {{ selectedTypeTitle }} 
      </h2>
      <h2 class="Info-custom" :style="{ fontSize: computedFontSize }">
        <span v-if="!$vuetify.display.mobile">งานบริการ : </span>{{ selectedServiceTitle }}
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
          class="text-red text-center Info-custom pb-2"
          :style="{ fontSize: computedFontSize, lineHeight: '30px' }"
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
    selectedProvince: String,
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
        ? "16px"
        : this.$vuetify.display.mdAndDown
        ? "17px"
        : "18px";
    },
    computedButtonFontSize() {
      return this.$vuetify.display.smAndDown
        ? "16px"
        : this.$vuetify.display.mdAndDown
        ? "17px"
        : "25px";
    },
  },
};
</script>
<style></style>
