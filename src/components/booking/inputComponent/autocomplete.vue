<template>
  <div>
    <p style="font-color: #1f4680">
      {{ header }}<span style="color: red">*</span>
    </p>
    <v-autocomplete
      :rules="rules"
      v-model="modelValueComputed"
      variant="outlined"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      required
      color="#1081E9"
      :disabled="disabled"
      @click="noUpdateData"
      hide-details="auto"
    ></v-autocomplete>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: [
    "header",
    "rules",
    "modelValue",
    "items",
    "itemTitle",
    "itemValue",
    "disabled",
  ],
  emits: ["update:modelValue"],
  computed: {
    modelValueComputed: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
  methods: {
    noUpdateData() {
      if (this.items.length === 0) {
        Swal.fire({
          title: "เเจ้งเตือน",
          text: `กรุณาเลือก${
            this.header === "อำเภอ/เขต" ? "จังหวัด" : "ประเภทงาน"
          }ที่ต้องการเข้ารับบริการ`,
          icon: "info",
          confirmButtonText: "ปิด",
        });
      }
    },
  },
};
</script>

<style></style>
