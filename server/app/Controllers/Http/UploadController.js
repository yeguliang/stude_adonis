"use strict";
const Helpers = use("Helpers");
const path = require("path");
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class UploadController {
  /**
   * Show a list of all uploads.
   * GET uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return "555";
  }

  /**
   * Render a form to be used for creating a new upload.
   * GET uploads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new upload.
   * POST uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const profilePics = request.file("file", {
        types: ["image"],
      });
      let fileNameArr = [];
      await profilePics.moveAll(Helpers.publicPath("uploads"), (file) => {
        // console.log("=>", `${new Date().getTime()}${file.clientName}`);
        fileNameArr.push(`${new Date().getTime()}${file.clientName}`);
        return {
          name: `${new Date().getTime()}${file.clientName}`,
        };
      });
      // console.log("=>", fileNameArr);
      // let url = Helpers.publicPath("uploads");
      // let ossFilePath = await path.join(url).replace(/\\/g, "/");
      let orUrl = `http://127.0.0.1:3333/`;
      for (let i in fileNameArr) {
        fileNameArr[i] = `${orUrl}uploads/${fileNameArr[i]}`;
      }
      response.json(fileNameArr);
    } catch (error) {
      response.json("error");
    }
  }

  /**
   * Display a single upload.
   * GET uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing upload.
   * GET uploads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update upload details.
   * PUT or PATCH uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a upload with id.
   * DELETE uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = UploadController;
