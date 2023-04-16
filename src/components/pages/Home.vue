<script setup lang="ts">
import { StudentsTable, CreateStudentDialog } from "@/domain/users";
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <h1>Meus alunos</h1>
        <create-student-dialog />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <students-table />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
