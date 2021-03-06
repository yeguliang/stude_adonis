"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
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
    return ["createdAt", "updatedAt"];
  }
}

module.exports = User;
