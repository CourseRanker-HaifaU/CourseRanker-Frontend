<template>
  <div class="h-cover w-full text-center">
    <div class="w-full p-8 m-4 md:max-w-md">
      <img
        class="round-big-logo"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-4xl my-6 text-primary">כניסה לאתר</h1>
      <form @submit.prevent="onSubmit">
        <input-field
          id="email"
          v-model="userEmail"
          type="email"
          label="אימייל"
          div-class="mb-4 text-right"
          :error-message="emailError"
        />
        <input-field
          id="password"
          v-model="userPassword"
          type="password"
          label="סיסמה"
          div-class="mb-4 text-right"
          :error-message="passwordError"
        />
        <div class="flex flex-col">
          <input
            id="login"
            type="submit"
            value="התחבר"
            class="button blue-button mt-6"
          />
          <hr class="my-4" style="border-top: 2px solid #c4c6c7" />
          <nuxt-link to="/signup" class="button green-button">
            צור חשבון חדש
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/utils'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
      emailError: '',
      passwordError: '',
    }
  },
  watch: {
    userEmail(oldVal, newVal) {
      if (this.emailError !== '' && oldVal !== newVal) {
        this.emailError = ''
      }
    },
    userPassword(oldVal, newVal) {
      if (this.passwordError !== '' && oldVal !== newVal) {
        this.passwordError = ''
      }
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        // TODO: Replace this with a more meaningful input to the user
        if (this.$v.userEmail.$invalid) {
          this.emailError = 'חובה להזין כתובת אימייל תקינה'
        }

        if (this.$v.userPassword.$invalid) {
          this.passwordError = 'חובה להזין סיסמה'
        }
      } else {
        userLogin(this, this.userEmail, this.userPassword)
      }
    },
  },
  validations: {
    userEmail: {
      required,
      email,
    },
    userPassword: {
      required,
    },
  },
}
</script>
