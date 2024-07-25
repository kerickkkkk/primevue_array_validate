<script setup>
const props = defineProps({
  inputMethod: {
    type: Function,
    default: null
  },
  value: {
    type: [String, Number],
    default: ''
  }
})
</script>
<template>
  <input type="text" class="form-control" :value="props.value" />
</template>
