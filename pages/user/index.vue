<template>
  <div>
    <!--------- page title --------->
    <panel-page-title title="פאנל משתמש"></panel-page-title>

    <!--------- change password --------->
    <div class="container text-right mb-4">
      <div
        class="flex flex-row bg-primary text-white items-baseline rounded-t-md px-2 pt-2"
        :class="{ 'rounded-md': !showIndices[0].isShown }"
      >
        <button class="mx-2 focus:outline-none" @click="toggleShown(0)">
          <font-awesome-icon
            :icon="['fas', showIndices[0].isShown ? 'minus' : 'plus']"
          />
        </button>
        <h2 class="text-xl font-bold ml-2 pb-3">שינוי סיסמה</h2>
      </div>
      <transition name="reveal" mode="out-in">
        <div
          v-show="showIndices[0].isShown"
          class="flex border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        >
          <form @submit.prevent="onSubmit">
            <input-field
              id="oldPassword"
              v-model="oldPassword"
              type="text"
              label="סיסמה קודמת"
              div-class="mb-4 text-right flex-1"
              show-label
            />
            <input-field
              id="newPassword"
              v-model="newPassword"
              type="text"
              label="סיסמה חדשה"
              div-class="mb-4 text-right flex-1"
              show-label
            />
            <input-field
              id="newRepassword"
              v-model="newRepassword"
              type="text"
              label="אישור סיסמה חדשה"
              div-class="mb-4 text-right flex-1"
              show-label
            />
            <div class="flex flex-col">
              <input
                id="changePassword"
                type="submit"
                value="שנה סיסמה"
                class="button red-button"
              />
            </div>
          </form>
        </div>
      </transition>
    </div>
    <!--------- end change password --------->

    <!--------- change first name --------->
    <div class="container text-right mb-4">
      <div
        class="flex flex-row bg-primary text-white items-baseline rounded-t-md px-2 pt-2"
        :class="{ 'rounded-md': !showIndices[1].isShown }"
      >
        <button class="mx-2 focus:outline-none" @click="toggleShown(1)">
          <font-awesome-icon
            :icon="['fas', showIndices[1].isShown ? 'minus' : 'plus']"
          />
        </button>
        <h2 class="text-xl font-bold ml-2 pb-3">שינוי שם פרטי</h2>
      </div>
      <transition name="reveal" mode="out-in">
        <div
          v-show="showIndices[1].isShown"
          class="flex border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        >
          <form @submit.prevent="onSubmit">
            <input-field
              id="newFirstName"
              v-model="newFirstName"
              type="text"
              label="שם פרטי"
              div-class="mb-4 text-right flex-1"
              show-label
            />

            <div class="flex flex-col">
              <input
                id="changeFirstName"
                type="submit"
                value="שנה שם פרטי"
                class="button red-button"
              />
            </div>
          </form>
        </div>
      </transition>
    </div>
    <!--------- end change first name --------->

    <!--------- change last name --------->
    <div class="container text-right mb-4">
      <div
        class="flex flex-row bg-primary text-white items-baseline rounded-t-md px-2 pt-2"
        :class="{ 'rounded-md': !showIndices[2].isShown }"
      >
        <button class="mx-2 focus:outline-none" @click="toggleShown(2)">
          <font-awesome-icon
            :icon="['fas', showIndices[2].isShown ? 'minus' : 'plus']"
          />
        </button>
        <h2 class="text-xl font-bold ml-2 pb-3">שינוי שם משפחה</h2>
      </div>
      <transition name="reveal" mode="out-in">
        <div
          v-show="showIndices[2].isShown"
          class="flex border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        >
          <form @submit.prevent="onSubmit">
            <input-field
              id="newLastName"
              v-model="newLastName"
              type="text"
              label="שם משפחה"
              div-class="mb-4 text-right flex-1"
              show-label
            />

            <div class="flex flex-col">
              <input
                id="changeLastName"
                type="submit"
                value="שנה שם משפחה"
                class="button red-button"
              />
            </div>
          </form>
        </div>
      </transition>
    </div>
    <!--------- end change last name --------->
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      newRepassword: '',
      newFirstName: '',
      newLastName: '',
      showIndices: [
        {
          changePassword: 0,
          isShown: false,
        },
        {
          changeFirstName: 1,
          isShown: false,
        },
        {
          changeLastName: 2,
          isShown: false,
        },
      ],
    }
  },
  methods: {
    toggleShown(index) {
      this.showIndices[index].isShown = !this.showIndices[index].isShown
    },
  },
}
</script>

<style scoped>
div.grid div {
  @apply flex;
  @apply flex-row;
  @apply items-baseline;
}
div.grid div strong {
  @apply ml-2;
}
.reveal-enter,
.reveal-leave-active {
  @apply opacity-0;
}
.reveal-enter-active,
.reveal-leave-active {
  @apply transition-all;
  @apply duration-300;
  @apply ease-in;
}

.reveal-leave {
  @apply opacity-100;
}
</style>
