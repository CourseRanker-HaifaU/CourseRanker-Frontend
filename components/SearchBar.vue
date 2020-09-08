<template>
  <div class="overall-div">
    <form>
      <div class="chip-div">
        <div v-for="(chip, index) in chipsList" :key="chip" class="chip">
          {{ chip }}
          <button class="delete-btn" @click.prevent="deleteChip(index)">
            x
          </button>
        </div>
        <input
          type="text"
          class="search-bar focus:outline-none"
          placeholder="חיפוש"
          @keyup.delete="deleteChip(chipsList.length - 1)"
        />
      </div>
      <br />
      <button type="submit" class="absolute right-0 top-0 mt-5 mr-4"></button>
      <button
        class="search-btn text-white py-2 px-4 rounded"
        @click.prevent="addChip('שנה א')"
      >
        שנה א'
      </button>
      <button
        class="search-btn text-white py-2 px-4 rounded"
        @click.prevent="addChip('שנה ב')"
      >
        שנה ב'
      </button>
      <button
        class="search-btn text-white py-2 px-4 rounded"
        @click.prevent="addChip('שנה ג')"
      >
        שנה ג'
      </button>
      <button
        class="search-btn text-white py-2 px-4 rounded"
        @click.prevent="addChip('קורסי חובה')"
      >
        קורסי חובה
      </button>
      <button
        class="search-btn text-white py-2 px-4 rounded"
        @click.prevent="addChip('קורסי בחירה')"
      >
        קורסי בחירה
      </button>
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
  display: flex;
  align-self: center;
  align-items: center;
  flex-direction: column;
}

.chip-div {
  margin: auto;
  padding: 5px;
  width: 41vw;
  min-height: 50px;
  flex-wrap: wrap;
  align-content: space-between;
  background-color: #fff;
  border: 2px solid #0664aa;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
}

.chip {
  margin: 4px;
  padding: 1px 4px;
  color: #fff;
  background: #0664aa;
  border: 1px solid #063a61;
  border-radius: 3px;
  align-items: center;
}

.delete-btn {
  padding-right: 4px;
  padding-left: 4px;
}

input {
  border: none;
  outline: none;
  padding: 4px;
  flex: 1 1 auto;
  background: transparent;
}

.search-btn {
  background-color: #d51111;
  border: 1px solid #9d0d0d;
}

.search-btn:hover {
  background-color: #bc0f0f;
  transition: background-color 0.2s ease-in;
}
</style>
