//fs = require('fs');
const filesomething = require("./seeddata.csv")
const seedNickname = "Pancho";
const seedName = "Francisco";
const seedGender = "m";

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  console.log("something-->",filesomething);
  return knex('nickname').del()
    .then(function () {
      // Inserts seed entries
      if (seedGender === "m"){  
        return knex('nickname').insert([
        {nickname: seedNickname,
        nickname_normed: seedNickname
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase(), 
        is_masculine: 1
        }
      ]);
    } else {
        return knex('nickname').insert([
        {nickname: seedNickname,
        nickname_normed: seedNickname
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase(),
        is_feminine: 1
        }
      ]);
    }
  }).then(function () {
    return
  }

  )
};






function readSeedData() {
    fs.readFile('./migrations/seeddata.csv', 'utf8', (err, data) => {
        if (err) {
            return console.log(process.cwd(), err);
        }
        return data;
    })
}

function insertSeedData (knex, seedNickname, seedName, seedGender) {
    const seedNicknameNormed = seedNickname.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const seedNameNormed = seedName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // this code should check to see if a given nickname is already in the database
    //const nicknameId = knex.select(id).from('nickname').where(nickname = seedNickname);
    if (true /*!nicknameId*/){
        if (seedGender === "m"){
            knex('nickname').insert({nickname: seedNickname},
            {nickname_normed: seedNicknameNormed}, {is_masculine: 1});
        } else {
            knex('nickname').insert({nickname: seedNickname},
            {nickname_normed: seedNicknameNormed}, {is_feminine: 1});
        }
        //nicknameId = knex.select(id).from('nickname').where(nickname = seedNickname);
    }
    //const nameId = knex.select(id).from('name').where(name = seedName);
    if (true /*!nameId*/){
        if (seedGender === "m"){
            knex('name').insert({name: seedName}, {name_normed: seedNameNormed}, {is_masculine: 1}).catch((err) => {console.log("error", err)});
        } else {
            knex('name').insert({name: seedName}, {name_normed: seedNameNormed}, {is_feminine: 1});
        }
        //nameId = knex.select(id).from('name').where(name = seedName);
    }
    //knex('name_to_nickname').insert({nickname_id: nicknameId}, {name_id: nameId});
}