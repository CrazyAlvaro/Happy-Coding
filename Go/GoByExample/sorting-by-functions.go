package main

import "sort"
import "fmt"

type byLength []string

func (s byLength) Len() int {
  return len(s)
}

func (s byLength) Swap(i, j int) {
  s[i], s[j] = s[j], s[i]
}

func (s byLength) Less(i, j int) bool {
  return s[i][0] < s[j][0]
}

func main() {
  fruits := []string{"peach", "banana", "kiwi"}
  sort.Sort(byLength(fruits))
  fmt.Println(fruits)
}
