<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <img
        class="round-big-logo"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-primary text-4xl my-6">צור חשבון חדש</h1>
      <form
        class="grid grid-cols-2 grid-flow-row gap-4 text-right"
        @submit.prevent="onSubmit"
      >
        <input-field
          id="firstname"
          v-model="firstName"
          type="text"
          label="שם פרטי"
          show-label
        />
        <input-field
          id="lastname"
          v-model="lastName"
          type="text"
          label="שם משפחה"
          show-label
        />
        <input-field
          id="email"
          v-model="userEmail"
          type="email"
          label="אימייל (אוניברסיטאי)"
          div-class="col-span-2"
          :error-message="emailError"
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
import newUser from '@/gql/newUser.gql'
import { showSuccessToast } from '@/utils'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

const campusMail = (value) => value.endsWith('@campus.haifa.ac.il')

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
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
  methods: {
    async onSubmit() {
      // TODO: Add validation
      this.$v.$touch()
      if (this.$v.$invalid) {
        // TODO: Notify the user in a better way
        if (this.$v.userEmail.$invalid) {
          this.emailError =
            'חובה להזין כתובת אימייל תקינה של האוניברסיטה (campus)'
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
            firstName: this.firstName,
            lastName: this.lastName,
          },
        })
        showSuccessToast(
          this,
          'המשתמש נוצר בהצלחה. יש לאמת אותו ע״י לחיצה על הקישור במייל שנשלח.'
        )
      }
    },
  },
  validations: {
    userEmail: {
      required,
      email,
      campusMail,
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
