<script setup lang="ts">
import { ref } from "vue";
import type { IWorkout } from "../types";
import { useDeleteWorkout } from "..";

defineProps<{ workout: IWorkout }>();

const deleteWorkout = useDeleteWorkout();

const isOpen = ref(false);
</script>

<template>
  <v-dialog persistent max-width="600px" v-model="isOpen" activator="parent">
    <template v-slot:activator="{ props }">
      <v-btn
        size="large"
        flat
        variant="text"
        color="error"
        v-bind="props"
        icon="mdi-delete"
      />
    </template>
    <v-card>
      <v-card-text>
        Você tem certeza que quer excluir o treino
        <strong>{{ workout.name }}</strong
        >?
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          :disabled="deleteWorkout.isLoading.value"
          color="primary"
          @click="isOpen = false"
          >Cancelar</v-btn
        >
        <v-btn
          color="error"
          variant="elevated"
          :loading="deleteWorkout.isLoading.value"
          @click="deleteWorkout.mutate({ id: workout._id })"
          >Excluir</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
