<script setup>
import zod from 'zod'
const initData = [
  { code: 'ABC123', name: 'Product 1' },
  { code: 'DEF456', name: 'Product 2' },
  { code: 'GHI789', name: 'Product 3' },
  { code: 'JKL012', name: 'Product 4' },
  { code: 'MNO345', name: 'Product 5' }
]

const columns = ref([
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' }
])

const vTempData = ref([])

const itemSchema = zod.object({
  code: zod.string(),
  name: zod.string()
})

useForm({
  validationSchema: toTypedSchema(zod.array(itemSchema)),
  initialValues: vTempData
})

const { replace, fields } = useFieldArray('vTempData')

const converFields = computed(() => {
  return fields.value?.map((item) => ({ ...item.value, vKey: item.key })) || []
})
onMounted(() => {
  replace([...initData])
})
</script>

<template>
  <header></header>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center pt-3 mb-1">PrimeVue DataTable + Vee Validate (Zod) :</h2>
          <h3 class="text-center mb-3">array validation (simple CRUD)</h3>
          <div class="text-end">
            <button class="btn btn-primary">新增</button>
          </div>
          <DataTable :value="converFields" tableStyle="min-width: 50rem" datakey="vKey">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
              <template #body="slotProps">
                <!-- {{ slotProps.data[`${col.field}`] }} -->
                <VeeInput :value="slotProps.data[`${col.field}`]"></VeeInput>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
