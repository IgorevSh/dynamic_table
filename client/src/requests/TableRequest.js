import axios from "axios";

const api = "http://localhost:3000";
export default class TableRequest {
  static async addRow(params) {
    return await axios.post(`${api}/table/add`, { ...params });
  }
  static async getRows(params) {
    return await axios.get(`${api}/table/rows`, { params });
  }
}
