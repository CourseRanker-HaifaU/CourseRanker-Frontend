<template>
  <div :class="divClass">
    <label for="email" :class="{ 'text-accent': error }">{{ label }}:</label>
    <input
      :id="id"
      :value="value"
      :type="type"
      :placeholder="label"
      class="form-field"
      :class="{
        'text-accent': error,
        'border-3': error,
      }"
      @input="emitInput"
    />
    <p v-if="error" class="text-accent text-xs">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    divClass: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    error() {
      return this.errorMessage.length > 0
    },
  },
  methods: {
    emitInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
