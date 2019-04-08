package main

import (
    "fmt"
	"encoding/json"
)

type person struct {
  name  string
}

func main() {
    print := fmt.Println

    // persons := []*person{}
    // var persons []*person
    persons := make([]*person, 0)
    byte, _ := json.Marshal(persons)
    print(string(byte))
    print(persons)

    print(len(persons))
    persons = append(persons, &person{name: "John"})
    persons = append(persons, &person{name: "Jim"})
}
