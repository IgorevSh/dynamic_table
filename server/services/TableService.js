import sequelize, { Op } from "sequelize";
import TableDB from "../models/TableDB.js";

class TableService {
  async getRows(params) {
    try {
      let queryParams = { limit: params.limit, offset: params.offset };
      if (params.filter && params.filterField && params.filterType) {
        if (params.filterType == "like") {
          queryParams.where = sequelize.where(
            sequelize.cast(sequelize.col(params.filterField), "varchar"),
            { [Op.like]: `%${params.filter}%` }
          );
        }
        if (params.filterType == "eq") {
          queryParams.where = {
            [params.filterField]: { [Op.eq]: params.filter },
          };
        }
        if (params.filterType == "gt") {
          queryParams.where = {
            [params.filterField]: { [Op.gt]: params.filter },
          };
        }
        if (params.filterType == "lt") {
          queryParams.where = {
            [params.filterField]: { [Op.lt]: params.filter },
          };
        }
      }
      if (params.sortKey && params.sortDir) {
        queryParams.order = [[params.sortKey, params.sortDir]];
      }
      const table = await TableDB.findAndCountAll(queryParams);
      return table;
    } catch (e) {
      console.error(e);
    }
  }
  async addRow(dataInfo) {
    try {
      if (
        typeof dataInfo.amount == "number" &&
        typeof dataInfo.distance == "number" &&
        typeof dataInfo.data == "number"
      ) {
        return await TableDB.create(dataInfo);
      } else {
        throw new Error("Wrong Validation");
      }
    } catch (e) {
      console.error(e);
    }
  }
}
export default new TableService();
