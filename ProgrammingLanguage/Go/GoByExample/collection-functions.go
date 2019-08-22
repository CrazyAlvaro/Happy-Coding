package main

import "strings"
import "fmt"

func Index(vs []string, t string) int {
  for i, v := range vs {
    if v == t {
      return i
    }
  }
  return -1
}

func Include(vs []string, t string) bool {
  return Index(vs, t) >= 0
}

func Any(vs []string, f func(string) bool) bool {
  for _, v := range vs {
    if f(v) {
      return true
    }
  }
  return false
}

func All(vs []string, f func(string) bool) bool {
  for _, v := range vs {
    if !f(v) {
      return false
    }
  }
  return true
}

func Filter(vs []string, f func(string) bool) []string {
  fvs := make([]string, 0)
  for _, v := range vs {
    if f(v) {
      fvs = append(fvs, v)
    }
  }
  return fvs
}

func Map(vs []string, f func(string) string) []string {
  mvs := make([]string, len(vs))
  for i, v := range vs {
    mvs[i] = f(v)
  }
  return mvs
}

func main() {
  var strs = []string{"peach", "strawberry", "apple", "pear", "plum"}
  fmt.Println(strs)
  
  fmt.Println(Index(strs, "pear"))
  fmt.Println(Include(strs, "grape"))
  fmt.Println(Include(strs, "strawberry"))

  fmt.Println("Any:")
  fmt.Println(Any(strs, func(v string) bool {
    return strings.HasPrefix(v, "p")
  }))

  fmt.Println(All(strs, func(v string) bool {
    return strings.HasPrefix(v, "p")
  }))

  fmt.Println(Filter(strs, func(v string) bool {
    return strings.Contains(v, "e")
  }))

  fmt.Println(Map(strs, strings.ToUpper))

}
