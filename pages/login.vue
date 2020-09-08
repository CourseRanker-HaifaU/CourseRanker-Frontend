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
        <div class="mb-4">
          <label>
            <input
              v-model="userEmail"
              type="email"
              name="email"
              placeholder="אימייל"
              class="form-field"
            />
          </label>
        </div>
        <div class="mb-4">
          <label>
            <input
              v-model="userPassword"
              type="password"
              name="password"
              placeholder="סיסמה"
              class="form-field"
            />
          </label>
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
import login from '@/gql/login.gql'

export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$apollo.mutate({
        mutation: login,
        variables: {
          email: this.userEmail,
          password: this.userPassword,
        },
      })
      this.$store.dispatch('auth/login', {
        token: res.data.login.token,
        expiresIn: res.data.login.refreshExpiresIn,
      })
      this.$router.push('/')
    },
  },
}
</script>
