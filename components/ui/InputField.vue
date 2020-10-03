<template>
  <div :class="divClass">
    <label v-if="showLabel" :for="id">{{ label }}:</label>
    <input
      :id="id"
      :value="value"
      :type="type"
      :placeholder="label"
      :disabled="disabled"
      class="form-field"
      :class="{
        'text-accent': error,
        'border-3': error,
      }"
      @input="emitInput"
    />
    <p v-if="error" class="text-accent text-xs mt-1">
      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    label: {
      type: String,
      default: '',
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
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    divClass: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: false,
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
