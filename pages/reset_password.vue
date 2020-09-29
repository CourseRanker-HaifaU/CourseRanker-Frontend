<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <img
        class="round-big-logo"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-primary text-4xl my-6">אפס סיסמא</h1>
      <form
        class="grid grid-cols-2 grid-flow-row gap-4 text-right"
        @submit.prevent="onSubmit"
      >
        <input-field
          id="email"
          v-model="userEmail"
          type="email"
          label="אימייל"
          div-class="col-span-2"
          :error-message="emailError"
          :disabled="true"
          show-label
        />
        <input-field
          id="password"
          v-model="userPassword"
          type="password"
          label="סיסמה"
          div-class="col-span-2"
          :error-message="passwordError"
          show-label
        />
        <input-field
          id="repassword"
          v-model="userRepassword"
          type="password"
          label="אישור סיסמה"
          div-class="col-span-2"
          :error-message="repasswordError"
          show-label
        />
        <input
          id="reset"
          type="submit"
          value="איפוס סיסמא"
          class="focus:outline-none w-full button blue-button col-span-2 mt-2"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
      userRepassword: '',
      emailError: '',
      passwordError: '',
      repasswordError: '',
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
    userRepassword(oldVal, newVal) {
      if (this.repasswordError !== '' && oldVal !== newVal) {
        this.repasswordError = ''
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

        if (this.$v.userPassword.$invalid) {
          this.passwordError = 'חובה להזין סיסמה באורך 6 תווים לפחות'
        }

        if (this.$v.userRepassword.$invalid) {
          this.repasswordError = 'שדה זה חייב להיות זהה לסיסמה'
        }
      } else {
        await this.$apollo.mutate({
          mutation: newUser,
          variables: {
            email: this.userEmail,
            password: this.userPassword,
          },
        })
        userLogin(this, this.userEmail, this.userPassword)
      }
    },
  },
  */
  validations: {
    userEmail: {
      required,
      email,
    },
    userPassword: {
      required,
      minLength: minLength(6),
    },
    userRepassword: {
      required,
      sameAsPassword: sameAs('userPassword'),
    },
  },
}
</script>
