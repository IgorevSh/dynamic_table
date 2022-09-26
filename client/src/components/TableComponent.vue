<template>
  <div class="filter_head">
    <select v-model="params.filterField">
      <option
        v-for="(key, item) in filterHeader"
        :key="key.label"
        :value="item"
      >
        {{ key.label }}
      </option>
    </select>
    <select v-model="params.filterType">
      <option v-for="key in filterTypes" :key="key.value" :value="key.value">
        {{ key.label }}
      </option>
    </select>
    <input type="text" v-model="params.filter" />
    <div class="limit_wrapper">
      <label>Rows per Page:</label>
      <select @change="changeLimit()" v-model="params.limit">
        <option v-for="limitNum in limits" :key="limitNum">
          {{ limitNum }}
        </option>
      </select>
    </div>
  </div>
  <div class="table_wrapper">
    <table>
      <tr>
        <th v-for="(header, key) in headerNames" :key="header.label">
          <div>
            <span>{{ header.label }}</span>
            <span
              v-if="header.sort != false"
              class="filter_none"
              :class="{
                filter_asc: header.state == 'ASC',
                filter_desc: header.state == 'DESC',
              }"
              @click="changeState(key, header.state)"
            ></span>
          </div>
        </th>
      </tr>
      <tr v-for="row in filteredTable" :key="row">
        <td v-for="item in Object.keys(row)" :key="item">{{ row[item] }}</td>
        <!--<button class="delete_button">X</button>-->
      </tr>
    </table>
  </div>
  <pagination-component
    :rows="rows"
    :page-limit="params.limit"
    @setOffset="setOffset($event)"
    ref="pagination"
  >
  </pagination-component>
</template>

<script>
import paginationComponent from "@/components/paginationComponent";
export default {
  name: "TableComponent",
  components: {
    paginationComponent,
  },
  props: {
    tableBody: {
      type: Array,
    },
    headers: {
      type: Object,
    },
    limits: {
      type: Array,
    },
    defaultLimit: {
      type: Number,
    },
    rows: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tableList: [],
      headerNames: {},
      filterTypes: [
        { label: "Содержит", value: "like" },
        { label: "Равно", value: "eq" },
        { label: "Меньше", value: "lt" },
        { label: "Больше", value: "gt" },
      ],
      params: {
        limit: this.defaultLimit || this.limits[0] || 10,
        offset: 0,
        filter: null,
        filterField: null,
        filterType: null,
      },
    };
  },
  async created() {
    this.headerNames = this.headers;
    this.params.filterField = Object.keys(this.filterHeader)[0];
    this.params.filterType = this.filterTypes[0].value;
  },
  computed: {
    filteredTable() {
      return this.sortColumns(this.tableBody || []);
    },
    filterHeader() {
      return Object.fromEntries(
        Object.entries(this.headerNames).filter(([itm, value]) => {
          if (value.sort == true) {
            return [itm, value];
          }
        })
      );
    },
  },
  methods: {
    changeLimit() {
      this.$refs.pagination.dropPagination();
    },
    async setOffset(offset) {
      this.params.offset = offset;
    },
    async updateTable() {
      this.$emit("updateTable", this.params);
    },
    sortColumns(data) {
      return data.map((itm) => {
        let headers = Object.keys(this.headerNames);
        let newItem = {};
        for (const key of headers) {
          newItem[key] = itm[key];
        }
        return newItem;
      });
    },
    async changeState(key, state) {
      for (const field in this.headerNames) {
        this.headerNames[field].state = null;
      }
      this.params.sortKey = key;
      if (state == null) {
        this.headerNames[key].state = "ASC";
      } else if (state == "ASC") {
        this.headerNames[key].state = "DESC";
      } else {
        this.headerNames[key].state = null;
      }
      this.params.sortDir = this.headerNames[key].state;
      await this.updateTable();
    },
  },
  watch: {
    params: {
      handler() {
        this.updateTable();
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.filter_head {
  width: 80%;
  display: flex;
  margin: 15px auto;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  input {
    height: 24px;
  }
  select {
    height: 30px;
  }
}
.limit_wrapper {
  display: flex;
  gap: 5px;
  align-items: center;
  label {
    font-size: 12px;
  }
  select {
    padding: 7px 7px 7px 0;
    height: 30px;
  }
}
.filter_none {
  cursor: pointer;
  position: relative;
  display: flex;
  font-size: 10px;
  width: 10px;
  height: 10px;
  opacity: 0;
  &:after {
    content: "▲";
  }
}
span.filter_asc {
  opacity: 1;
  background: none;

  &:after {
    content: "▲";
  }
}
span.filter_desc {
  opacity: 1;
  background: none;
  &:after {
    content: "▼";
  }
}

.table_wrapper {
  display: flex;
  width: 80%;
  margin: auto;
  overflow: auto;
  table {
    width: 100%;
    border-spacing: 0;
    td,
    th {
      padding: 10px 15px;
      border-bottom: 1px solid black;
    }
    th {
      background-color: #e1e1e1;
      position: relative;
      div {
        display: flex;
        justify-content: center;
        gap: 10px;
        align-items: center;
      }
      &:hover {
        span.filter_none {
          opacity: 1;
        }
      }
    }
    .delete_button {
      border: none;
      background: none;
      height: 40px;
    }
  }
}
/*@media screen and (max-width: 450px) {
  .filter_none {
    background-color: #2c3e50;
    width: 7px;
    height: 7px;
    opacity: 1;
    &:after {
      content: "";
    }
  }
}*/
</style>
