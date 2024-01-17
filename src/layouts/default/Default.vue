<template>
  <default-bar>
    <default-view />
  </default-bar>
</template>

<script>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";

export default {
  components: {
    DefaultBar,
    DefaultView,
  },
};
</script>
