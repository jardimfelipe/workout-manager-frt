<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from "vue";

import { TextField } from "@/components";
import { useWorkoutStore } from "@/stores/workouts";
import { validationRules } from "@/utils/validationRules";

const EMPTY_EXERCISE = { exercise: "", method: "", series: "" };

const workoutStore = useWorkoutStore();
const formRef = ref<any>(null);
const isOpen = ref(false);
const form = reactive({
  name: "",
  exercises: [{ exercise: "", method: "", series: "" }],
});

const resetForm = () => {
  formRef.value.reset();
  form.exercises = [EMPTY_EXERCISE];
};

const handleChange = ({ value, name }: any, eventIndex: any) => {
  const newEx = form.exercises.map((ex, index) => ({
    ...ex,
    ...(index === eventIndex ? { [name]: value } : null),
  }));
  const newForm = { name: form.name, exercises: newEx };
  Object.keys(form).forEach((key) => delete form[key as keyof typeof form]);
  Object.keys(newForm).forEach((key) => (form[key] = newForm[key]));
};

const handleCloseButton = () => {
  isOpen.value = false;
};
const addExercise = () => {
  form.exercises.push(EMPTY_EXERCISE);
};

const onSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  workoutStore.addNewTraining(form);
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
    <v-card>
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

          <v-row>
            <v-col
              v-for="(exercise, index) in form.exercises"
              :key="index"
              cols="12"
            >
              <v-container>
                <v-row>
                  <v-col>
                    <text-field
                      label="Exercício"
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
              </v-container>
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
