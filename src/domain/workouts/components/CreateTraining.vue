<script setup lang="ts">
import { ref, nextTick } from "vue";
import cloneDeep from "lodash.clonedeep";

import { TextField } from "@/components";
import { useWorkoutStore } from "@/stores/workouts";
import { validationRules } from "@/utils/validationRules";

const EMPTY_EXERCISE = { exercise: "", method: "", series: "" };

const workoutStore = useWorkoutStore();
const formRef = ref<any>(null);
const isOpen = ref(false);
const form = ref({
  name: "",
  exercises: [{ exercise: "", method: "", series: "" }],
});

workoutStore.$onAction(({ after }) => {
  after(() => {
    form.value.exercises = [EMPTY_EXERCISE];
  });
});

const handleChange = ({ value, name }: any, eventIndex: any) => {
  const newEx = form.value.exercises.map((ex, index) => ({
    ...ex,
    ...(index === eventIndex ? { [name]: value } : null),
  }));
  const newForm = { name: form.value.name, exercises: newEx };
  form.value = newForm;
};

const handleCloseButton = () => {
  isOpen.value = false;
};

const addExercise = async  () => {
  form.value.exercises.push(EMPTY_EXERCISE);
  await nextTick()
  const input = document.querySelector(`#exercicio-${form.value.exercises.length - 1}`) as HTMLInputElement
  if(input) input.focus()
};

const onSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  const storeTraining = workoutStore.newWorkout.training || [];
  const clone = cloneDeep(form.value);
  const workout = {
    ...workoutStore.newWorkout,
    training: [...storeTraining, clone],
  };
  workoutStore.setNewWorkout(workout);
  isOpen.value = false;
};
</script>

<template>
  <v-dialog persistent v-model="isOpen" max-width="900px">
    <template v-slot:activator="{ props }">
      <v-btn color="greyButton" block v-bind="props">
        <v-icon icon="mdi-plus" /> Adicionar módulo de treino
      </v-btn>
    </template>
    <v-card v-model="isOpen">
      <v-card-title>
        <div class="d-flex justify-space-between">
          <strong>Novo conjunto de treinos</strong>
          <v-btn
            @click="handleCloseButton"
            flat
            icon="mdi-close"
            density="compact"
          />
        </div>
        <code>

          {{ formRef }}
        </code>
      </v-card-title>

      <v-container>
        <v-form ref="formRef" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="6">
              <text-field
                label="Nome do conjunto"
                v-model="form.name"
                :rules="[validationRules.required]"
              />
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col
              v-for="(exercise, index) in form.exercises"
              :key="index"
              cols="12"
            >
              <v-row dense>
                <v-col>
                  <text-field
                    label="Exercício"
                    :id="`exercicio-${index}`"
                    @input="
                      handleChange(
                        { value: $event.target.value, name: 'exercise' },
                        index
                      )
                    "
                    :value="exercise.exercise"
                    :rules="[validationRules.required]"
                  />
                </v-col>
                <v-col>
                  <text-field
                    label="Método"
                    :value="exercise.method"
                    @input="
                      handleChange(
                        { value: $event.target.value, name: 'method' },
                        index
                      )
                    "
                    :rules="[validationRules.required]"
                  />
                </v-col>
                <v-col>
                  <text-field
                    label="Séries"
                    :value="exercise.series"
                    @input="
                      handleChange(
                        { value: $event.target.value, name: 'series' },
                        index
                      )
                    "
                    :rules="[validationRules.required]"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                @click="addExercise"
                x-large
                block
                color="greyButton"
                class="pa-6"
              >
                <v-icon icon="mdi-plus" />
                <span>Adicionar exercício</span>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn x-large block type="submit" color="primary" class="pa-6">
                <span>Finalizar</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style></style>
