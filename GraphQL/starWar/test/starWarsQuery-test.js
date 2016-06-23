query HeroNameQuery {
  hero {
    name
  }
}

// In this case, only Query operation
{
  hero {
    name
  }
}

// KEY Aspect: nest queries
{
  hero {
    name
    friends  {
      name
      appearsIn
      friends{
        name
      }
    }
  }
}

{
  human(id: "1000") {
    name
  }
}

// Define the query
query FetchSomeIDQuery($someId: String!) {
  human(id: $someId) {
    name
  }
}

// field aliases
{
  luke: human(id: "1000") {
    name
  }
}

{
  luke: human(id: "1000") {
    name
    homePlanet
  }
  leia: human(id: "1003") {
    name
    homePlanet
  }
}

{
   luke: human(id: "1000") {
     ...HumanFragment
   }
   leia: human(id: "1003") {
     ...HumanFragment
   }
}

fragment HumanFragment on Human {
  name
  homePlanet
}

{
  hero {
    __typename
    name
  }
}