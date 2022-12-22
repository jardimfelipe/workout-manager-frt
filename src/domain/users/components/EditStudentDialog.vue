<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import type { IUser } from "../type";
import useDeleteStudent from "../services/useDeleteStudent";
import usePatchWorkout from "@/domain/workouts/services/usePatchWorkout";
import { DeleteWorkoutDialog } from "@/domain/workouts";
import { useWorkoutStore } from "@/stores/workouts";

const props = defineProps<{ student: IUser }>();

const deleteStudent = useDeleteStudent();
const patchWorkout = usePatchWorkout();
const workoutStore = useWorkoutStore();
const router = useRouter();

const isOpen = ref(false);

const createWorkout = () => {
  workoutStore.setCreatingWorkoutStudent(props.student);
  router.push("/workouts/new");
};

const sortedWorkouts = computed(() =>
  [...(props.student.workouts || [])].sort((a, b) =>
    a.isActive < b.isActive ? 1 : -1
  )
);
</script>

<template>
  <v-dialog v-model="isOpen" max-width="900px" activator="parent">
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
            v-for="(workout, index) in sortedWorkouts"
            :key="workout._id"
            cols="12"
          >
            <v-card :color="workout.isActive ? 'greyButton' : 'default'">
              <v-container>
                <v-row align="center">
                  <v-col cols="2">
                    <delete-workout-dialog :workout="workout" />
                  </v-col>
                  <v-col>
                    {{ workout.name }}
                  </v-col>
                  <v-col>
                    {{ workout.training.map(({ name }) => name).join(", ") }}
                  </v-col>
                  <v-col>
                    <v-switch
                      color="success"
                      :disabled="patchWorkout.isLoading.value"
                      v-model="workout.isActive"
                      @click.prevent="
                        patchWorkout.mutate({
                          id: workout._id,
                          isActive: !workout.isActive,
                        })
                      "
                      dense
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
              @click="createWorkout"
              x-large
              block
              color="greyButton"
              class="pa-6"
            >
              <v-icon icon="mdi-plus" />
              <span>Criar um novo treino</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          :disabled="deleteStudent.isLoading.value"
          color="primary"
          @click="isOpen = false"
          >Fechar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
