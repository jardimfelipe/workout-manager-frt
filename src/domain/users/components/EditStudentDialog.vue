<script setup lang="ts">
import { ref } from "vue";

import type { IUser } from "../type";
import useDeleteStudent from "../services/useDeleteStudent";

defineProps<{ student: IUser }>();

const deleteStudent = useDeleteStudent();

const isOpen = ref(false);
</script>

<template>
  <v-dialog persistent v-model="isOpen" max-width="900px" activator="parent">
    <template v-slot:activator="{ props }">
      <v-btn
        size="large"
        flat
        variant="text"
        color="primary"
        v-bind="props"
        icon="mdi-circle-edit-outline"
      />
    </template>
    <v-card>
      <v-card-title>
        <strong>{{ student.name }}</strong>
      </v-card-title>

      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Nome"
              density="compact"
              variant="outlined"
              v-model="student.name"
              readonly
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Email"
              density="compact"
              variant="outlined"
              v-model="student.email"
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="(workout, index) in student.workouts"
            :key="workout._id"
            cols="12"
          >
            <v-card>
              <v-container>
                <v-row align="center">
                  <v-col>
                    {{ workout.name }}
                  </v-col>
                  <v-col>
                    {{ workout.training.map(({ name }) => name).join(", ") }}
                  </v-col>
                  <v-col>
                    <v-switch
                      color="primary"
                      :label="workout.isActive ? 'Ativo' : 'Inativo'"
                      v-model="workout.isActive"
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

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
