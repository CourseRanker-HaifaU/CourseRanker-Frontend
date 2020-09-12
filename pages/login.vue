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
        <div class="mb-4 text-right">
          <label for="email">אימייל:</label>
          <input
            id="email"
            v-model="userEmail"
            type="email"
            name="email"
            placeholder="אימייל"
            class="form-field"
          />
        </div>
        <div class="mb-4 text-right">
          <label for="password">סיסמה:</label>
          <input
            id="password"
            v-model="userPassword"
            type="password"
            name="password"
            placeholder="סיסמה"
            class="form-field"
          />
        </div>
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
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        // TODO: Replace this with a more meaningful input to the user
        alert('Invalid input!')
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
