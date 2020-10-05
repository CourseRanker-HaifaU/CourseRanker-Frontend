<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <img
        class="round-big-logo"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-primary text-4xl my-6">איפוס סיסמה</h1>
      <form
        class="grid grid-cols-2 grid-flow-row gap-4 text-right"
        @submit.prevent="onSubmit"
      >
        <input-field
          id="email"
          v-model="emailByToken"
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
          value="איפוס סיסמה"
          class="focus:outline-none w-full button blue-button col-span-2 mt-2"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import emailByToken from '@/gql/emailByToken.gql'
import resetPassword from '@/gql/resetPassword.gql'
import { showSuccessToast, showErrorToast } from '@/utils'

export default {
  data() {
    return {
      emailByToken: '',
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
  apollo: {
    emailByToken: {
      query: emailByToken,
      variables() {
        return {
          resetToken: this.$route.params.token || '',
        }
      },
      errorPolicy: 'all',
      error(error) {
        this.$nuxt.error({ statusCode: 400, message: error })
      },
    },
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        if (this.$v.userPassword.$invalid) {
          this.passwordError = 'חובה להזין סיסמה באורך 6 תווים לפחות'
        }

        if (this.$v.userRepassword.$invalid) {
          this.repasswordError = 'שדה זה חייב להיות זהה לסיסמה'
        }
      } else {
        const result = await this.$apollo.mutate({
          mutation: resetPassword,
          variables: {
            input: {
              resetToken: this.$route.params.token || '',
              newPassword: this.userPassword,
            },
          },
        })
        if (
          'data' in result &&
          'resetPassword' in result.data &&
          result.data.resetPassword.ok
        ) {
          showSuccessToast(this, 'איפוס סיסמה הושלם', null, () => {
            window.location = '/login'
          })
        } else {
          showErrorToast(this, 'איפוס סיסמה נכשל')
        }
      }
    },
  },
  validations: {
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
