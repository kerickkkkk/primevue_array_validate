<script setup>
import {ref} from 'vue'
const products = ref([
  { code: 'ABC123', name: 'Product 1' },
  { code: 'DEF456', name: 'Product 2' },
  { code: 'GHI789', name: 'Product 3' },
  { code: 'JKL012', name: 'Product 4' },
  { code: 'MNO345', name: 'Product 5' }
])
</script>

<template>
  <header></header>

  <main>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="text-end">
            <button class="btn btn-primary">新增</button>
          </div>
          <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
