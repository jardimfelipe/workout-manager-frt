<template>
  <main class="overflow-hidden">
    <div class="login-container">
      <div class="login-container__img" />
      <slot />
    </div>
  </main>
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
}
</style>
