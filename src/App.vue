<template>
  <router-view />
</template>

<script>
import { getUserInfoStore } from "@/stores/getter_stores";

export default {
  computed: {
    userInfoStore() {
      return getUserInfoStore();
    },
  },
  async created() {
    await this.userInfoStore.fetchUserInfo();
  },
};
</script>

<style>
@import "./styles/main.scss";
</style>
