<template>
  <v-text-field
    v-bind="$attrs"
    :value="modelValue"
    variant="outlined"
    @input="updateValue"
    density="compact"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);
const modelValue = ref("");

const updateValue = (e: any) => {
  modelValue.value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<style></style>
