const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    NameLookup: [Nickname]
    NickNameLookup: [Name]
  }
  type Name {
    name: String!
  }
  type Nickname {
    nickname: String!
  }

  type Mutation {
    AddName(name: String): Name
    AddNickname(name: String): Nickname
  }
`);

// The root provides the resolver functions for each type of query or mutation.
const root = {
  Pokemons: () => {
    return data.pokemon;
  },
  Pokemon: (request) => {
    if (request.name) {
      return data.pokemon.find((pokemon) => pokemon.name === request.name);
    } else if (request.id) {
      return data.pokemon.find((pokemon) => pokemon.id === request.id);
    }
  },
  Attacks: () => {
    return data.attacks;
  },
  AttackByMainType: (request) => {
    return data.attacks[request.type];
  },
  AttackByName: (request) => {
    return data.attacks.fast.find((attack) => attack.name === request.name) ===
      undefined
      ? data.attacks.special.find((attack) => attack.name === request.name)
      : data.attacks.fast.find((attack) => attack.name === request.name);  // should this just be true?
  },
  AttackBySubType: (request) => {
    return data.attacks.fast
      .filter((attack) => attack.type === request.type)
      .concat(
        data.attacks.special.filter((attack) => attack.type === request.type)
      );
  },
  PokemonByType: (request) => {
    return data.pokemon.filter((pokemon) =>
      pokemon.types.includes(request.type)
    );
  },
  PokemonByAttack: (request) => {
    return data.pokemon.filter((pokemon) => {
      for (const attackMainTypes in pokemon.attacks) {
        for (const attack of pokemon.attacks[attackMainTypes]) {
          if (attack.name === request.attack) return true;
        }
      }
    });
  },
  RemovePokemon: (request) => {
    let index, pokemon;
    if (request.name) {
      index = data.pokemon.findIndex(
        (pokemon) => pokemon.name === request.name
      );
      pokemon = data.pokemon[index];
    } else if (request.id) {
      index = data.pokemon.findIndex((pokemon) => pokemon.id === request.id);
      pokemon = data.pokemon[index];
    }
    data.pokemon.splice(index, 1);
    return pokemon;
  },
  AddPokemon: (request) => {
    const newPokemon = request.input;
    data.pokemon.push(newPokemon);
    return newPokemon;
  },
  EditPokemonStringAttributes: (request) => {
    const invalidAttributes = [
      "attacks",
      "weight",
      "height",
      "evolutionRequirements",
      "evolutions",
      "previousEvolutions",
    ];
    if (invalidAttributes.includes(request.attribute)) {
      throw new Error("cannot modify non-string attributes");
    }
    let value =
      request.attribute === "fleeRate" ? Number(request.value) : request.value;

    let index;
    if (request.name) {
      index = data.pokemon.findIndex(
        (pokemon) => pokemon.name === request.name
      );
    } else if (request.id) {
      index = data.pokemon.findIndex((pokemon) => pokemon.id === request.id);
    }
    data.pokemon[index][request.attribute] = value;
    return data.pokemon[index];
  },
  AddAttack: (request) => {
    data.attacks[request.type].push(request.input);
    return request.input;
  },
  AddType: (request) => {
    data.types.push(request.input);
    return data.types;
  },
};

// Start your express server!
const app = express();

/*
  The only endpoint for your server is `/graphql`- if you are fetching a resource, 
  you will need to POST your query to that endpoint. Suggestion: check out Apollo-Fetch
  or Apollo-Client. Note below where the schema and resolvers are connected. Setting graphiql
  to 'true' gives you an in-browser explorer to test your queries.
*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
