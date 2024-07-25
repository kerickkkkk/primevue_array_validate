<script setup>
import zod from 'zod'

const nonEmptyString = zod.preprocess(
  (input) => {
    if (input === '' || input === undefined || input === null) {
      return undefined
    }
    return input
  },
  zod.union([zod.string(), zod.number()])
)

const initData = [
  { code: '', name: 'Product 1' },
  { code: 'DEF456', name: 'Product 2' },
  { code: 'GHI789', name: '' },
  { code: 'JKL012', name: 'Product 4' },
  { code: 'MNO345', name: 'Product 5' }
]

const columns = ref([
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' }
])

const itemSchema = zod.object({
  code: nonEmptyString,
  name: nonEmptyString
})
// 初始化 驗證 與資料
const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    // 對應 initailValues
    zod.object({
      vTempData: zod.array(itemSchema)
    })
  ),
  initialValues: { vTempData: [] }
})

// 因為 fields 是 readonly 需使用它內建功能的去操作
const { replace, push, update, remove, fields } = useFieldArray('vTempData')

// 將 fields 重新整理成 DataTable的格式 建立連接
// key 是 vee-validate 的惟一值
const converFields = computed(() => {
  return fields.value?.map((item) => ({ ...item.value, vKey: item.key })) || []
})

const addItem = () => {
  push({
    code: new Date().getTime(),
    name: `Product ${converFields.value.length + 1}`
  })
}

const removeMethod = (idx) => {
  remove(idx)
}
const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
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
            <button @click="addItem" class="btn btn-sm btn-primary">新增</button>
          </div>
          <form @submit="onSubmit">
            <DataTable :value="converFields" datakey="vKey">
              <Column
                v-for="col of columns"
                :key="col.field"
                :field="col.field"
                :header="col.header"
              >
                <template #body="slotProps">
                  <VeeInput
                    :value="slotProps.data[`${col.field}`]"
                    :updateSingleColumn="update"
                    :index="slotProps.index"
                    :data="slotProps.data"
                    :columnName="col.field"
                    :name="`vTempData[${slotProps.index}].${col.field}`"
                    :errors="errors"
                  ></VeeInput>
                </template>
              </Column>
              <Column header="操作">
                <template #body="slotProps">
                  <button
                    class="btn btn-sm btn-danger"
                    type="button"
                    @click="removeMethod(slotProps.index)"
                  >
                    刪除
                  </button>
                </template>
              </Column>
              <template #empty>
                <div class="text-center">無資料</div>
              </template>
            </DataTable>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
