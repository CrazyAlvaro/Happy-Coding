

enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String!     // Not NULL
  name: String
  friends: [Character]
  appearsIn: [Episode]
}

type Human : Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  homePlanet: String
}

// A Robot in science fiction
type Droid : Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  primaryFunction: String
}

// Define the schema, named Query by convention
type Query {
  hero(episode: Episode): Character
  human(id: String!): human     // id is a Non-NULL argument
  droid(id: String!): Droid
}
