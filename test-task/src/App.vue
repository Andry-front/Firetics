<template>
  <div id="wrapper">

    <ProductsPage />
  </div>
</template>

<script setup lang="ts">
import ProductsPage from './views/ProductsPage.vue';
</script>

<style>
body {
  margin: 0;
}

#wrapper {
  font-family: Arial, sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(
      to bottom left,
      #56c3ca 0%,
      #369d99 100%
  );
}
</style>
