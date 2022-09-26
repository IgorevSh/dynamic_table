<template>
  <table-component
    :headers="names"
    :limits="limitOptions"
    :rows="rowsCount"
    :table-body="fixedTableBody"
    :defaultLimit="defaultLimit"
    @updateTable="updateTable($event)"
    ref="table"
  ></table-component>
  <!--
  Поля для ввода новых строк(для теста)
  <div>
    <input type="text" v-model="name" placeholder="name" />
    <input type="number" v-model="amount" placeholder="amount" />
    <input type="number" v-model="distance" placeholder="distance" />
    <button @click="saveField()">Save</button>
  </div>-->
</template>

<script>
import TableComponent from "@/components/TableComponent";
import getDate from "@/methods/getDate";
import TableModel from "@/models/TableModel";
export default {
  name: "HomeView",
  components: { TableComponent },
  data() {
    return {
      names: {
        name: { label: "Имя", sort: true, state: null },
        distance: { label: "Дистанция", sort: true, state: null },
        amount: { label: "Количество", sort: true, state: null },
        data: { label: "Дата", sort: false, state: null },
      },
      tableBody: {},
      limitOptions: [5, 10, 20],
      defaultLimit: 10,
      rowsCount: 0,
      name: "",
      amount: null,
      distance: null,
    };
  },
  async created() {
    await this.updateTable({ limit: this.defaultLimit, offset: 0 });
  },
  computed: {
    fixedTableBody() {
      return this.mapDate(this.tableBody?.data?.rows || []);
    },
  },
  methods: {
    getDate,
    mapDate(data) {
      return data.map((itm) => {
        let newItem = itm;
        newItem.data = this.getDate(new Date(parseInt(newItem.data)));
        return newItem;
      });
    },
    async updateTable(params) {
      this.tableBody = await TableModel.getRows(params);
      this.rowsCount = this.tableBody.data.count;
    },
    async saveField() {
      await TableModel.addRow({
        name: this.name,
        amount: this.amount,
        distance: this.distance,
        data: Date.now(),
      });
      await this.$refs.table.updateTable();
    },
  },
};
</script>

<style scoped></style>
