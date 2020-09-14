<template>
  <div class="overall-div">
    <form>
      <div class="chip-div">
        <div v-for="(chip, index) in chipsList" :key="chip" class="chip">
          {{ chip }}
          <button
            class="delete-btn focus:outline-none"
            @click.prevent="deleteChip(index)"
          >
            <font-awesome-icon :icon="['fas', 'times-circle']" />
          </button>
        </div>
        <input
          type="text"
          class="focus:outline-none"
          placeholder="חיפוש"
          @keyup.delete="deleteChip(chipsList.length - 1)"
        />
      </div>
      <br />
      <div class="btn-div">
        <button class="search-btn" @click.prevent="addChip('שנה א')">
          שנה א'
        </button>
        <button class="search-btn" @click.prevent="addChip('שנה ב')">
          שנה ב'
        </button>
        <button class="search-btn" @click.prevent="addChip('שנה ג')">
          שנה ג'
        </button>
        <button class="search-btn" @click.prevent="addChip('קורסי חובה')">
          קורסי חובה
        </button>
        <button class="search-btn" @click.prevent="addChip('קורסי בחירה')">
          קורסי בחירה
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chipsList: [],
    }
  },
  methods: {
    addChip(activeChip) {
      if (!this.chipsList.includes(activeChip)) {
        this.chipsList.push(activeChip)
      }
    },
    deleteChip(index) {
      this.chipsList.splice(index, 1)
    },
  },
}
</script>

<style>
.overall-div {
  @apply flex;
  @apply self-center;
  @apply items-center;
  @apply flex-col;
  @apply mb-10;
  @apply mt-6;
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
