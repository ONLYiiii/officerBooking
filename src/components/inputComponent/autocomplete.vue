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
    ></v-autocomplete>
  </div>
</template>

<script>
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
};
</script>

<style></style>
