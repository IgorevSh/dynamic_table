import TableRequest from "@/requests/TableRequest";

export default class TableModel {
  static async getRows(params) {
    return await TableRequest.getRows(params);
  }
  static async addRow(params) {
    return await TableRequest.addRow(params);
  }
}
