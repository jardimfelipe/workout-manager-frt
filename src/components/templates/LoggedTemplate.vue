<script setup lang="ts">
import useLogout from "@/domain/auth/useLogout";

const items = [{ title: "Home", icon: "mdi-home", route: "/" }];

const logout = useLogout();
</script>

<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :to="item.route"
            :prepend-icon="item.icon"
            :key="i"
            :value="item"
            :title="item.title"
            variant="plain"
          >
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn color="primary" flat @click="logout.mutate()" block>
              Sair
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main><slot /></v-main>
    </v-layout>
  </v-app>
</template>

<style></style>
