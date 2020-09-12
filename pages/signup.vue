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
        />
        <input-field
          id="lastname"
          v-model="lastName"
          type="text"
          label="שם משפחה"
        />
        <input-field
          id="email"
          v-model="userEmail"
          type="email"
          label="אימייל"
          div-class="col-span-2"
        />
        <input-field
          id="password"
          v-model="userPassword"
          type="password"
          label="סיסמה"
          div-class="col-span-2"
        />
        <input-field
          id="רקpassword"
          v-model="userRepassword"
          type="password"
          label="אישור סיסמה"
          div-class="col-span-2"
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
import { userLogin } from '@/utils'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      userEmail: '',
      userPassword: '',
      userRepassword: '',
    }
  },
  methods: {
    async onSubmit() {
      // TODO: Add validation
      this.$v.$touch()
      if (this.$v.$invalid) {
        // TODO: Notify the user in a better way
        alert('Invalid data!')
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
        userLogin(this, this.userEmail, this.userPassword)
      }
    },
  },
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
      sameAsPassword: sameAs('userPassword'),
    },
  },
}
</script>
