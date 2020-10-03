<template>
  <div class="overall-div">
    <div class="chip-div">
      <div v-for="(chip, index) in filterTags" :key="chip" class="chip">
        {{ chip }}
        <button
          class="delete-btn focus:outline-none"
          @click.prevent="deleteTag(index)"
        >
          <font-awesome-icon :icon="['fas', 'times-circle']" />
        </button>
      </div>
      <input
        ref="textBox"
        type="text"
        class="focus:outline-none"
        placeholder="חיפוש"
        :value="keywords"
        @keydown.delete="deleteLastTag"
        @input="emitInput"
      />
    </div>
    <div class="btn-div">
      <button
        v-for="tag in allSearchTags"
        :key="tag"
        class="search-btn"
        @click.prevent="addTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      keywords: 'search/keywords',
      filterTags: 'search/selectedTags',
      availableTags: 'search/availableTags',
    }),
    allSearchTags() {
      const fromServer = this.availableTags.map((item) => item.name)
      return [...fromServer, 'קורסי חובה', 'קורסי בחירה']
    },
  },
  created() {
    this.initTagsList(this)
  },
  methods: {
    ...mapMutations({
      addTag: 'search/addTag',
      deleteTag: 'search/deleteTag',
      changeKeywords: 'search/changeKeywords',
    }),
    ...mapActions({
      initTagsList: 'search/initTagsList',
    }),
    emitInput(event) {
      this.changeKeywords(event.target.value)
    },
    deleteLastTag(event) {
      if (this.$refs.textBox.selectionStart === 0) {
        this.deleteTag(this.filterTags.length - 1)
      }
    },
  },
}
</script>

<style scoped>
.overall-div {
  @apply flex;
  @apply self-center;
  @apply items-center;
  @apply flex-col;
  @apply mb-10;
  @apply mt-6;
  @apply w-full;
  @apply min-w-full;
}

.chip-div {
  @apply flex;
  @apply flex-row;
  @apply bg-white;
  @apply rounded-md;
  @apply border-2;
  @apply border-solid;
  @apply border-primary;
  @apply p-1;
  @apply w-full;
  @apply min-w-full;
  @apply mb-4;

  min-height: 50px;
}

.chip {
  @apply flex;
  @apply items-center;
  @apply text-white;
  @apply bg-primary;
  @apply m-1;
  @apply py-px;
  @apply px-1;

  border-radius: 3px;
}

.btn-div {
  @apply w-full;
  @apply grid;
  @apply grid-cols-3;
  @apply gap-4;
}

.delete-btn {
  @apply flex;
  @apply items-center;
  @apply pr-2;
}

input {
  @apply border-none;
  @apply outline-none;
  @apply flex-1;
  @apply bg-transparent;
  @apply p-1;
}

.search-btn {
  @apply bg-accent;
  @apply text-white;
  @apply py-2;
  @apply px-2;
  @apply rounded;
  @apply border;
  @apply border-accent-border;
}

.search-btn:hover {
  @apply bg-accent-hover;
  @apply transition;
  @apply duration-300;
  @apply ease-in;
}

.search-btn:focus {
  @apply outline-none;
}

@screen md {
  .search-btn {
    @apply px-4;
  }

  .btn-div {
    @apply grid-cols-5;
    @apply gap-6;
  }
}
</style>
