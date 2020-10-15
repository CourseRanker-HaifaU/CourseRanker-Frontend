<template>
  <div class="h-cover w-full text-center">
    <div class="p-8 m-4 md:max-w-md w-full">
      <img
        class="round-big-logo"
        src="~/assets/images/logoranker.png"
        alt="לוגו ועד הסטודנטים"
      />
      <h1 class="text-primary text-4xl my-6">אימות חשבון</h1>
      <p v-if="!isVerified">נא להמתין, המערכת מאמתת את החשבון.</p>
      <p v-else>
        החשבון אומת בהצלחה. כעת ניתן להיכנס אליו ע״י לחיצה על ״כניסה״ למעלה.
      </p>
    </div>
  </div>
</template>

<script>
import verifyUser from '@/gql/verifyUser.gql'

export default {
  data() {
    return {
      isVerified: false,
    }
  },
  created() {
    this.$apollo
      .mutate({
        mutation: verifyUser,
        variables: {
          input: {
            email: this.$route.query.email,
            verifyToken: this.$route.query.token,
          },
        },
      })
      .then((result) => {
        this.isVerified = true
      })
  },
}
</script>
