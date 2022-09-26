<template>
  <div v-if="pages > 1" class="pagination_wrapper">
    <button
      class="pagination_button"
      :disabled="currentPage == 0 ? true : false"
      :class="{ disabled: currentPage == 0 }"
      @click="shiftOffset('left')"
    >
      <span>❮</span>
    </button>
    <div class="pagination_list">
      <button
        :class="{ selected: currentPage == i }"
        @click="currentPage = i"
        v-for="i in pageRange"
        :key="i"
      >
        {{ i + 1 }}
      </button>
    </div>
    <button
      class="pagination_button"
      :disabled="currentPage == pages - 1 ? true : false"
      :class="{ disabled: currentPage == pages - 1 }"
      @click="shiftOffset('right')"
    >
      ❯
    </button>
  </div>
</template>

<script>
export default {
  name: "paginationComponent",
  props: {
    pageLimit: {
      type: Number,
    },
    rows: {
      type: Number,
    },
  },
  data() {
    return {
      shift: 5,
      currentPage: 0,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.rows / this.pageLimit);
    },
    pageRange() {
      return this.createRange(
        Math.floor(this.currentPage / this.shift) * this.shift,
        this.pages - 1
      ).splice(0, this.shift);
    },
  },
  methods: {
    dropPagination() {
      this.currentPage = 0;
    },
    setOffset(pageNum) {
      this.currentPage = pageNum;
    },
    createRange(start, end) {
      const r = [];
      for (let i = start; i <= end; i++) {
        r.push(i);
      }
      return r;
    },
    shiftOffset(direction) {
      if (direction == "left" && this.currentPage > 0) {
        this.currentPage--;
      }
      if (direction == "right" && this.currentPage < this.pages - 1) {
        this.currentPage++;
      }
    },
  },
  watch: {
    currentPage() {
      this.$emit("setOffset", this.currentPage * this.pageLimit);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination_list {
  display: flex;
  justify-content: center;
  gap: 5px;
}
.selected {
  color: deepskyblue;
}
.pagination_wrapper {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 10px 0;
  button {
    border: none;
    background: none;
    height: 16px;
    font-size: 16px;
    &.pagination_button {
      height: 16px;
      display: flex;
      flex-direction: column;
      font-size: 20px;
      justify-content: flex-end;
      margin-top: 7px;
      &.disabled {
        cursor: default;
      }
    }
  }
}
</style>
