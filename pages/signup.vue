<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <img
        class="round-big-logo"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-primary text-4xl my-6">צור חשבון חדש</h1>
      <form class="grid grid-cols-2 grid-flow-row gap-4 text-right">
        <div>
          <label for="firstname">שם פרטי:</label>
          <input
            id="firstname"
            type="text"
            name="first"
            placeholder="שם פרטי"
            class="form-field"
          />
        </div>
        <div>
          <label for="lastname">שם משפחה:</label>
          <input
            id="lastname"
            type="text"
            name="last"
            placeholder="שם משפחה"
            class="form-field"
          />
        </div>
        <div class="col-span-2">
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
        <div class="col-span-2">
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
        <div class="col-span-2">
          <label for="repassword">אישור סיסמה:</label>
          <input
            id="repassword"
            v-model="userRepassword"
            type="password"
            name="repassword"
            placeholder="אישור סיסמה"
            class="form-field"
          />
        </div>
        <input
          id="sign-up"
          type="submit"
          value="צור חשבון חדש"
          class="focus:outline-none w-full button blue-button col-span-2 mt-2"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>
