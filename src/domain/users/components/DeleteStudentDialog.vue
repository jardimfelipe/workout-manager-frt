<script setup lang="ts">
import { ref } from "vue";
import type { IUser } from "../type";
import { useDeleteStudent } from "../";

defineProps<{ student: IUser }>();

const deleteStudent = useDeleteStudent();

const isOpen = ref(false);
</script>

<template>
  <v-dialog persistent max-width="600px" v-model="isOpen" activator="parent">
    <template v-slot:activator="{ props }">
      <v-btn
        flat
        disabled
        size="large"
        variant="text"
        color="error"
        v-bind="props"
        icon="mdi-delete"
      />
    </template>
    <v-card>
      <v-card-text>
        Você tem certeza que quer excluir o aluno
        <strong>{{ student.name }}</strong
        >?
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          :disabled="deleteStudent.isLoading.value"
          color="primary"
          @click="isOpen = false"
          >Cancelar</v-btn
        >
        <v-btn
          color="error"
          variant="elevated"
          :loading="deleteStudent.isLoading.value"
          @click="deleteStudent.mutate({ id: student._id })"
          >Excluir</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
