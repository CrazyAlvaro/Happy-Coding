// INVALID: primaryFunction does not exist on Character
{
  hero {
    name
    primaryFunction
  }
}

{
  hero {
    name
    ...DroidFields
  }
}

fragment DroidFields on Droid {
  primaryFunction
}

// concise version
{
  hero {
    name
    ... on Droid {
      primaryFunction
    }
  }
}
