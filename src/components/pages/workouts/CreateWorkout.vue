<script setup lang="ts">
import { useWorkoutStore } from "@/stores/workouts";
import { TextField } from "@/components";
import { CreateTraining, useCreateWorkout } from "@/domain/workouts";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const workoutStore = useWorkoutStore();
const authStore = useAuthStore();
const createWorkout = useCreateWorkout();
const workoutName = ref("");
const router = useRouter();
const toast = useToast();

const onSubmit = () => {
  const studentId = workoutStore.creatingWorkoutStudent?._id;
  const workout = {
    name: workoutName.value,
    isActive: false,
    createdBy: authStore.user?._id,
    studentId,
    ...workoutStore.newWorkout,
  };
  createWorkout.mutate(workout, {
    onSuccess() {
      workoutStore.reset();
      router.push("/");
      toast.success("Treino criado com sucesso!");
    },
  });
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          Criando um treino para
          {{ workoutStore.creatingWorkoutStudent?.name }}
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          :loading="createWorkout.isLoading.value"
          class="pa-6 position-relative"
        >
          <v-overlay
            color="white"
            contained
            v-model="createWorkout.isLoading.value"
          />
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="primary"
              height="4"
              indeterminate
            />
          </template>
          <h3 class="mb-4">Dados do aluno</h3>
          <v-row v-if="workoutStore.creatingWorkoutStudent?.name">
            <v-col cols="6">
              <v-text-field
                label="Nome"
                density="compact"
                variant="outlined"
                v-model="workoutStore.creatingWorkoutStudent.name"
                readonly
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Email"
                density="compact"
                variant="outlined"
                v-model="workoutStore.creatingWorkoutStudent.email"
                readonly
              />
            </v-col>
          </v-row>

          <v-divider class="my-5" />

          <h3 class="mb-4">Dados do treino</h3>
          <v-form @submit.prevent="onSubmit">
            <v-row>
              <v-col class="d-flex" cols="6">
                <text-field
                  v-model="workoutName"
                  name="name"
                  label="Nome do treino"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
                v-for="(training, index) in workoutStore.newWorkout.training"
              >
                <v-card class="pa-4">
                  <v-row>
                    <v-col>
                      <span>{{ training.name }}</span>
                    </v-col>
                    <v-col>
                      <span>{{ training.exercises.length }} exercícios</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <create-training />
              </v-col>
              <v-col>
                <v-btn block type="submit" color="primary">Salvar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
