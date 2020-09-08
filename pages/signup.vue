<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <img
        class="m-auto rounded-full border-4 border-solid border-input-border"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-primary text-4xl my-6">יצירת חשבון</h1>
      <form class="grid grid-cols-2 grid-flow-row gap-4">
        <div>
          <input
            type="text"
            name="last"
            placeholder="שם משפחה"
            class="form-field"
          />
        </div>
        <div>
          <input
            type="text"
            name="first"
            placeholder="שם פרטי"
            class="form-field"
          />
        </div>
        <div class="col-span-2">
          <input
            v-model="userEmail"
            type="email"
            name="email"
            placeholder="אימייל"
            class="form-field"
          />
        </div>
        <div class="col-span-2">
          <input
            v-model="userPassword"
            type="password"
            name="password"
            placeholder="סיסמה"
            class="login-input shadow-md rounded w-full py-2 px-3 text-gray-700 leading-tight"
          />
        </div>
        <div class="col-span-2">
          <input
            v-model="userRepassword"
            type="password"
            name="repassword"
            placeholder="חיזרו על הסיסמה"
            class="form-field"
          />
        </div>
        <input
          id="sign-up"
          type="submit"
          value="יצירת חשבון חדש"
          class="focus:outline-none w-full blue-button col-span-2"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.blue-button {
  @apply text-white;
  @apply py-2;
  @apply px-4;
  @apply rounded;
  @apply mt-2;
  @apply bg-primary;
  @apply w-full;
}

.blue-button:focus {
  @apply outline-none;
}

.blue-button:hover {
  @apply transition-colors;
  @apply duration-200;
  @apply ease-in;
  @apply cursor-pointer;

  background-color: #005793;
}

.form-field {
  @apply border;
  @apply border-input-border;
  @apply border-solid;
  @apply shadow-md;
  @apply rounded;
  @apply w-full;
  @apply py-2;
  @apply px-3;
  @apply text-gray-700;
  @apply leading-tight;
}
</style>
