<template>
  <div class="flex h-cover w-full">
    <div
      class="w-full bg-white rounded-lg shadow-lg p-8 m-4 md:max-w-sm text-center"
    >
      <h1 class="login-header text-grey-darkest text-4xl mb-6">כניסה לאתר</h1>
      <form>
        <div class="mb-4">
          <label>
            <input
              v-model="userEmail"
              type="email"
              name="email"
              placeholder="אימייל"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
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
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <input
          type="submit"
          value="התחבר"
          class="submit-btn text-white py-2 px-4 rounded focus:outline-none mt-6"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
    }
  },
}
</script>

<style>
input[type='email']:focus,
input[type='password']:focus {
  outline: none;
  box-shadow: 0 0 0 2pt #d51111;
}

.login-header {
  margin-bottom: 30px;
  color: #0664aa;
}
.submit-btn {
  background-color: #0664aa;
}
.submit-btn:hover {
  background-color: #065793;
  transition: background-color 0.2s ease-in;
}
</style>
