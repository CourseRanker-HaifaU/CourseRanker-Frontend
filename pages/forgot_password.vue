<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <img
        class="round-big-logo"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-primary text-4xl my-6">שחזור סיסמה</h1>
      <form class="gap-4 text-center" @submit.prevent="onSubmit">
        <input-field
          id="email"
          v-model="userEmail"
          type="text"
          label="הכנס כתובת אימייל"
        />
        <input
          id="sign-up"
          type="submit"
          value="שלח בקשת שחזור"
          class="focus:outline-none w-full button blue-button col-span-2 mt-6"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      userEmail: '',
      emailError: '',
    }
  },
  watch: {
    userEmail(oldVal, newVal) {
      if (this.emailError !== '' && oldVal !== newVal) {
        this.emailError = ''
      }
    },
  },
  /*
  methods: {
    async onSubmit() {
      // TODO: Add validation
      this.$v.$touch()
      if (this.$v.$invalid) {
        // TODO: Notify the user in a better way
        if (this.$v.userEmail.$invalid) {
          this.emailError = 'חובה להזין כתובת אימייל תקינה'
        }
      } else {
        await this.$apollo.mutate({
          mutation: sendResetMail,
          variables: {
            email: this.userEmail,
          },
        })
        userLogin(this, this.userEmail, this.userPassword)
      }
    },
  }, */
  validations: {
    userEmail: {
      required,
      email,
    },
  },
}
</script>
