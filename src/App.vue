<template>
  <router-view v-if="isReady" />
</template>

<script setup>
import { useUserInfoStore } from "@/stores/user_info";
import { onMounted, inject, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/booking";

const swal = inject("$swal");

// const userInfoStore = computed(() => {
//   return getUserInfoStore();
// });

const router = useRouter();

const isReady = ref(false);

router.isReady().then(async () => {
  // console.log(router.currentRoute.value.query.pid);
  // console.log(router.currentRoute.value.query.app_code);
  // console.log(router.currentRoute.value.query.app_token);
  const userInfo = await api.getUserInfo();

  if (userInfo.status != 200) {
    back();
  }
  const userStore = useUserInfoStore();
  userStore.setUser(userInfo.data);
  isReady.value = true;
});

onMounted(async () => {});

async function back() {
  await swal.fire({
    icon: "error",
    title: "ไม่สามารถใช้งานได้",
    html: "กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
  });
  swal.router.go(-1);
}
</script>

<style>
@import "./styles/main.scss";
</style>
