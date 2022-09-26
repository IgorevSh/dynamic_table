import DB from "./DB.js";

class Table extends DB.Sequelize.Model {}
Table.init(
  {
    data: {
      type: DB.DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DB.DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    amount: {
      type: DB.DataTypes.FLOAT,
      unique: false,
      allowNull: false,
      default: false,
    },
    distance: {
      type: DB.DataTypes.FLOAT,
      unique: false,
      allowNull: false,
    },
  },
  {
    sequelize: DB.sequelize,
    modelName: "Table",
    timestamps: false,
    tableName: "test_table",
  }
);
await Table.sync();

export default Table;
