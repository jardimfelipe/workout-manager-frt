<script setup lang="ts">
import useStudentsQuery from "../services/studentsQuery";
import DeleteStudentDialog from "./DeleteStudentDialog.vue";
import EditStudentDialog from "./EditStudentDialog.vue";

const { data, isLoading } = useStudentsQuery();
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th></th>
        <th>Nome</th>
        <th>Email</th>
        <th>Treino Atual</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        <td colspan="4">
          <div class="table-loader py-6 w-full">
            <v-progress-circular :size="40" indeterminate color="primary" />
            <span class="mt-2">Carregando alunos</span>
          </div>
        </td>
      </tr>

      <tr v-for="student in data" :key="student._id">
        <td>
            <delete-student-dialog :student="student" />
            <edit-student-dialog :student="student" />
        </td>
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>
          {{
            student.workouts?.find(({ isActive }) => !!isActive)?.name || "---"
          }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss" scoped>
.table-loader {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
