<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useQueryProvider } from "vue-query";
import { useRoute } from "vue-router";

import { useAuthStore } from "./stores/auth";
import { getSavedState } from "./utils/localStorage";

const route = useRoute();
const authStore = useAuthStore();
useQueryProvider({});

onBeforeMount(() => {
  const user = getSavedState("user");
  if (user) {
    authStore.setUser(user);
  }
});
</script>

<template>
  <transition name="fade">
    <component :is="route.meta.template">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </component>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
