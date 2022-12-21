<script setup lang="ts">
import { isAxiosError } from "axios";
import { reactive, ref } from "vue";

import { TextField } from "../";
import { validationRules } from "@/utils/validationRules";
import useLogin from "@/domain/auth/useLogin";

const login = useLogin();
const form = reactive({ email: "", password: "" });
const formError = ref("");

const onSubmit = () => {
  formError.value = "";
  login.mutate(form, {
    onError: (error: any) => {
      if (isAxiosError(error)) {
        formError.value = error.response?.data.message;
      } else {
        formError.value = "Ocorreu um erro, tente novamente";
      }
    },
  });
};
</script>

<template>
  <div class="login-container__form">
    <v-form @submit.prevent="onSubmit">
      <v-container>
        <h1 class="my-6 text-center"><i>#WEGOGYM</i></h1>
        <text-field
          class="mb-3"
          type="email"
          label="E-mail"
          :rules="[validationRules.required, validationRules.email]"
          v-model="form.email"
        />
        <text-field
          type="password"
          label="Senha"
          :rules="[validationRules.required]"
          v-model="form.password"
        />

        <v-btn
          block
          :loading="login.isLoading.value"
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
        >
          Entrar
        </v-btn>
        <p class="text-center mt-4 text-red font-weight-bold" v-if="formError">
          {{ formError }}
        </p>
      </v-container>
    </v-form>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  &__img {
    flex-basis: 60%;
    background: #ffffff url("@/assets/imgs/login_bg.jpg") no-repeat center
      center;
    background-size: cover;
  }
  &__form {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .v-form {
      width: 100%;
    }
    .v-container {
      max-width: 500px;
    }
  }
}
</style>
