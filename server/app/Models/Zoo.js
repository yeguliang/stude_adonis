"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Zoo extends Model {
  // 表名
  static get table() {
    return "user";
  }
  static get primaryKey() {
    return "id";
  }
  static get createdAtColumn() {
    return "createdAt";
  }
  static get updatedAtColumn() {
    return "updatedAt";
  }
  static get hidden() {
    return ["id", "createdAt", "updatedAt"];
  }
}

module.exports = Zoo;
