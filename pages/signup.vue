<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-sm">
      <img
        class="m-auto rounded-full"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
        style="border: 3px solid #a6a8a9"
      />
      <h1 class="login-header text-4xl mb-6">יצירת חשבון</h1>
      <form>
        <div class="flex flex-row w-full mb-4">
          <label>
            <input
              type="text"
              name="last"
              placeholder="שם משפחה"
              class="login-input shadow-md rounded py-2 px-3 text-gray-700 leading-tight"
            />
          </label>
          <label>
            <input
              type="text"
              name="first"
              placeholder="שם פרטי"
              class="login-input shadow-md rounded py-2 px-3 text-gray-700 leading-tight"
            />
          </label>
        </div>
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
        <div class="mb-4">
          <label>
            <input
              v-model="userRepassword"
              type="password"
              name="repassword"
              placeholder="חיזרו על הסיסמה"
              class="login-input shadow-md rounded w-full py-2 px-3 text-gray-700 leading-tight"
            />
          </label>
        </div>

        <input
          id="sign-up"
          type="submit"
          value="יצירת חשבון חדש"
          class="text-white py-2 px-4 rounded focus:outline-none w-full mt-6"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
#sign-up {
  background-color: #0664aa;
}
#sign-up:hover {
  background-color: #065793;
  transition: background-color 0.2s ease-in;
}
</style>
