"use strict";

const _ = require("lodash");
const Database = use("Database");
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ request, response, view }) {
    // 数据库语句
    // return await Database.table("zoo").select("*");
    // let [result] = await Database.raw(`SELECT * FROM zoo;`);
    // return result;

    let result = await User.all();
    return result;
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    let result = await User.all();
    return result;
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const newUser = await request.all();
    if (!newUser.name) {
      throw { error: "name:null" };
    }
    if (!newUser.password) {
      throw { error: "psw:null" };
    }
    // return newUser;
    let result = await User.create(newUser);
    response.json(result);
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const user = User.find(params.id);
    return user;
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    let userData = await User.find(params.id);
    let newUserData = await request.all();
    if (userData) {
      _.assign(userData, newUserData);
      await userData.save();
      // console.log(userData, newUserData);
      // return userData;
    }
    // return userData;
    response.json(userData);
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    let deleteUser = await User.find(params.id);
    if (deleteUser) {
      await deleteUser.delete();
    }
    response.json(deleteUser);
  }
}

module.exports = UserController;
