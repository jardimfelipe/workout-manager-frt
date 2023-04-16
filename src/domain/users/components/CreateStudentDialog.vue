<script setup lang="ts">
import { reactive, ref } from "vue";
import { validationRules } from "@/utils/validationRules";
import { useAuthStore } from "@/stores/auth";
import { TextField } from "@/components";

import { useCreateStudent } from "../";
import { RolesEnum } from "../type";
import { isAxiosError } from "axios";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const formRef = ref<any>(null);
const authStore = useAuthStore();
const createStudent = useCreateStudent();
const form = reactive({
  name: "",
  email: "",
  role: RolesEnum.STUDENT,
  teacherId: authStore.user?._id,
});

const isOpen = ref(false);

const onSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  createStudent.mutate(form, {
    onError: (error: any) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Ocorreu um erro, tente novamente");
      }
    },
  });
};
</script>

<template>
  <v-dialog max-width="600px" v-model="isOpen" activator="parent">
    <template v-slot:activator="{ props }">
      <v-btn flat size="large" variant="flat" color="primary" v-bind="props">
        <v-icon start icon="mdi-plus" />Criar Aluno</v-btn
      >
    </template>
    <v-card>
      <v-form lazy-validation ref="formRef" @submit.prevent="onSubmit">
        <v-card-title> Criando um aluno </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="6">
              <text-field
                label="Nome"
                v-model="form.name"
                validation-on-blur
                :rules="[validationRules.required]"
              />
            </v-col>
            <v-col cols="6">
              <text-field
                label="Email"
                v-model="form.email"
                :rules="[validationRules.required, validationRules.email]"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            variant="elevated"
            :loading="createStudent.isLoading.value"
            type="submit"
            >Criar aluno</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
