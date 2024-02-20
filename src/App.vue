<template>
  <router-view />
</template>

<script setup>
import { useUserInfoStore } from "@/stores/user_info";
import { onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/booking";

const swal = inject("$swal");

// const userInfoStore = computed(() => {
//   return getUserInfoStore();
// });

const router = useRouter();

router.isReady().then(async () => {
  console.log(router.currentRoute.value.query.pid);
  console.log(router.currentRoute.value.query.app_code);
  console.log(router.currentRoute.value.query.app_token);
  const query = router.currentRoute.value.query;
  const userInfo = await api.getUserInfo(
    query.pid,
    query.app_code,
    query.app_token
  );
  if (userInfo.status != 200) {
    back();
  }
  console.log(userInfo.data);
  const userStore = useUserInfoStore();
  userStore.setUser(
    userInfo.data.pid,
    `${userInfo.data.firstName} ${userInfo.data.middleName} ${userInfo.data.lastName}`
  );
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
