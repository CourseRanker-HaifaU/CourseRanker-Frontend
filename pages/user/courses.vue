<template>
  <div>
    <panel-page-title title="הקורסים שלי"></panel-page-title>
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
        <h2 class="text-xl font-bold ml-2 pb-3">חיפוש קורס חדש</h2>
      </div>
      <transition name="reveal" mode="out-in">
        <div
          v-show="showIndices[0].isShown"
          class="grid gap-1 gap-y-3 border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        >
          <search-bar></search-bar>
        </div>
      </transition>
    </div>
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
        <h2 class="text-xl font-bold ml-2 pb-3">הקורסים שלי</h2>
      </div>
      <transition name="reveal" mode="out-in">
        <div
          v-show="showIndices[1].isShown"
          class="grid gap-1 gap-y-3 border-primary border-b-2 border-l-2 border-r-2 rounded-b-md p-4"
        >
          <courses-table
            :which-table="'myCourses'"
            :is-lecturer="false"
            :is-assist="false"
          ></courses-table>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showIndices: [
        {
          searchCourse: 0,
          isShown: false,
        },
        {
          myCoursesTable: 1,
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
