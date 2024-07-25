<script setup>
const props = defineProps({
  inputMethod: {
    type: Function,
    default: null
  },
  value: {
    type: [String, Number],
    default: ''
  },
  updateSingleColumn: {
    type: Function,
    default: () => {}
  },
  index: {
    type: Number,
    default: 0
  },
  data: {
    type: Object,
    default: () => ({})
  },
  columnName: {
    type: String,
    required: true
  },
  // 重要驗證判斷依據 格式須為 useFieldArray綁定名稱[arrayIndex][columnName]
  name: {
    type: String,
    required: true
  },
  errors: {
    type: Object,
    required: true
  }
})

const updateInput = (e) => {
  const { updateSingleColumn, index, data, columnName } = props
  updateSingleColumn(index, {
    ...data,
    [columnName]: e.target.value + ''
  })
}

</script>
<template>
  <input
    type="text"
    class="form-control"
    :name="props.name"
    @input="updateInput"
    :value="props.value"
    :class="{
      ['is-invalid ']: !!props.errors[props.name]
    }"
  />
  <small
    v-show="props.errors[props.name]"
    :class="{
      'text-danger': props.errors[props.name]
    }"
  >
    {{ props.errors[props.name] }}
  </small>
</template>
