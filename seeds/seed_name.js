console.log(process.cwd());

const nameData = require("./names.json");
const nicknameData = require("./nicknames.json");
const nameToNicknameData = require("./names_to_nicknames.json");

exports.seed = function(knex, Promise) {
  return knex("nickname")
    .del()
    .then(function() {
      return knex("name").del();
    })
    .then(function() {
      return knex("name_to_nickname").del();
    })
    .then(function() {
      return knex("nickname").insert(nicknameData);
    })
    .then(function() {
      return knex("name").insert(nameData);
    })
    .then(function() {
      return knex("name_to_nickname").insert(nameToNicknameData);
    });
};
