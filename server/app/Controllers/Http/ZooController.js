"use strict";

const _ = require("lodash");
const Database = use("Database");
const Zoo = use("App/Models/Zoo");

// 示例：
// async index() {
//   // return await Database.table("zoo").select("*");
//   // let [result] = await Database.raw(`SELECT * FROM zoo;`);
//   // return result;

//   let result = await Zoo.all();
//   return result;
// }
// async show({ params }) {
//   let findOne = await Zoo.find(params.id);
//   return findOne || { error: "no find" };
// }
// async store({ request, params, response }) {
//   const newAnimal = request.all();
//   if (!newAnimal.name) {
//     throw { error: "inval params" };
//   }
//   let result = await Zoo.create(newAnimal);
//   response.json(result);
// }
// async update({ request, params }) {
//   const updated = request.all();
//   let findOne = await Zoo.find(params.id);
//   if (findOne) {
//     _.assign(findOne, updated);
//     await findOne.save();
//   }
//   return { findOne };
// }
// async destroy({ params }) {
//   let findOne = await Zoo.find(params.id);
//   if (findOne) {
//     await findOne.delete();
//   }
//   return findOne;
// }
// }

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with zoos
 */
class ZooController {
  /**
   * Show a list of all zoos.
   * GET zoos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let result = await Zoo.all();
    // console.log("Zoo", Zoo.;
    return result;
  }

  /**
   * Render a form to be used for creating a new zoo.
   * GET zoos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new zoo.
   * POST zoos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single zoo.
   * GET zoos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing zoo.
   * GET zoos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update zoo details.
   * PUT or PATCH zoos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a zoo with id.
   * DELETE zoos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ZooController;
