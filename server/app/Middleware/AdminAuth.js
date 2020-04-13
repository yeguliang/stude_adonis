"use strict";

const { CryptUtil } = require("..//Util");
const { ERR } = require("../../../constants");
const User = use("../Models/User");

class AdminAuth {
  async handle({ request }, next) {
    const payload = CryptUtil.jwtDecode(
      request.header("Authorization") || request.input("token")
    );
    if (!payload) {
      throw ERR.AUTH_FAILED;
    } else {
      if (!payload.adminID) {
        throw ERR.AUTH_FAILED;
      }
      request.adminID = payload.adminID;
      let User = await User.find(request.adminID);
      request.User = User;
    }
    await next();
  }
}

module.exports = AdminAuth;
