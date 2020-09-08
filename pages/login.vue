<template>
  <div class="h-cover w-full text-center">
    <div class="w-full p-8 m-4 md:max-w-sm">
      <img
        class="m-auto rounded-full"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
        style="border: 3px solid #a6a8a9"
      />
      <h1 class="login-header text-4xl mb-6">כניסה לאתר</h1>
      <form @submit.prevent="obSubmit">
        <div class="mb-4">
          <label>
            <input
              v-model="userEmail"
              type="email"
              name="email"
              placeholder="אימייל"
              class="login-input shadow-md rounded w-full py-2 px-3 text-gray-700 leading-tight"
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
              class="login-input shadow-md rounded w-full py-2 px-3 text-gray-700 leading-tight"
            />
          </label>
        </div>
        <div class="flex flex-col">
          <input
            id="login"
            type="submit"
            value="התחבר"
            class="text-white py-2 px-4 rounded focus:outline-none mt-6"
          />
          <hr class="mt-6" style="border-top: 2px solid #c4c6c7" />
          <nuxt-link
            id="signup"
            to="/signup"
            class="text-white py-2 px-4 rounded focus:outline-none mt-6"
          >
            צור/צרי חשבון חדש
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
    async obSubmit() {
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

<style>
.login-header {
  margin-bottom: 30px;
  color: #0664aa;
}
.login-input {
  border: 1px solid #a6a8a9;
}
.login-input:focus {
  outline: none;
  border: none;
  box-shadow: 0 0 0 2pt #d51111;
}
#login {
  background-color: #0664aa;
}
#login:hover {
  background-color: #065793;
  transition: background-color 0.2s ease-in;
}
#signup {
  background-color: #00ab0c;
}
#signup:hover {
  background-color: #01900b;
  transition: background-color 0.2s ease-in;
}
</style>
