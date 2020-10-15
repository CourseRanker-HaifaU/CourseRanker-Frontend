<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <img
        class="round-big-logo"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-primary text-4xl my-6">ביטול יצירת חשבון</h1>
      <p v-if="!isCancelled">נא להמתין, המערכת מוחקת את החשבון.</p>
      <p v-else>
        החשבון נמחק. אם ברצונכם להירשם בעתיד, תוכלו לעשות זאת בעזרת טופס ההרשמה
        באתר.
      </p>
    </div>
  </div>
</template>

<script>
import cancelUser from '@/gql/cancelUser.gql'

export default {
  data() {
    return {
      isCancelled: false,
    }
  },
  created() {
    this.$apollo
      .mutate({
        mutation: cancelUser,
        variables: {
          input: {
            email: this.$route.query.email,
            verifyToken: this.$route.query.token,
          },
        },
      })
      .then((result) => {
        this.isCancelled = true
      })
      .catch((error) => {
        this.$nuxt.error({
          statusCode: 403,
          message: error,
        })
      })
  },
}
</script>
