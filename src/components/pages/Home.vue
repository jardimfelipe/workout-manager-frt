<script setup lang="ts">
import StudentsTable from "@/domain/users/components/StudentsTable.vue";
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Meus alunos</h1>
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
