// https://gobyexample.com/

//[X]  Hello World 11/28/18
//[X]  Values
//[X]  Variables
//[X]  Constants
//[X]  For
//[X]  If/Else
//[ ]  Switch
//[ ]  Arrays
//[ ]  Slices
//[ ]  Maps
//[ ]  Range
//[ ]  Functions
//[ ]  Multiple Return Values
//[ ]  Variadic Functions
//[ ]  Closures
//[ ]  Recursion
//[ ]  Pointers
//[ ]  Structs
//[ ]  Methods
//[ ]  Interfaces
//[ ]  Errors
//[ ]  Goroutines
//[ ]  Channels
//[ ]  Channel Buffering
//[ ]  Channel Synchronization
//[ ]  Channel Directions
//[ ]  Select
//[ ]  Timeouts
//[ ]  Non-Blocking Channel Operations
//[ ]  Closing Channels
//[ ]  Range over Channels
//[ ]  Timers
//[ ]  Tickers
//[ ]  Worker Pools
//[ ]  Rate Limiting
//[ ]  Atomic Counters
//[ ]  Mutexes
//[ ]  Stateful Goroutines
//[ ]  Sorting
//[ ]  Sorting by Functions
//[ ]  Panic
//[ ]  Defer
//[ ]  Collection Functions
//[ ]  String Functions
//[ ]  String Formatting
//[ ]  Regular Expressions
//[ ]  JSON
//[ ]  Time
//[ ]  Epoch
//[ ]  Time Formatting / Parsing
//[ ]  Random Numbers
//[ ]  Number Parsing
//[ ]  URL Parsing
//[ ]  SHA1 Hashes
//[ ]  Base64 Encoding
//[ ]  Reading Files
//[ ]  Writing Files
//[ ]  Line Filters
//[ ]  Command-Line Arguments
//[ ]  Command-Line Flags
//[ ]  Environment Variables
//[ ]  Spawning Processes
//[ ]  Exec'ing Processes
//[ ]  Signals
//[ ]  Exit

package main

import "fmt"
import "math"

func Hello_world() {
  fmt.Printf("hello, world\n")
}

func Values() {
  fmt.Println("go" + "lang")
  fmt.Println("1+1 = ", 1+1)
  fmt.Println("7.0/3.0 =", 7.0/3.0)

  fmt.Println(true && false)
  fmt.Println(true || false)
  fmt.Println(!true)
}

func Variables() {
  var a = "initial"
  fmt.Println(a)

  var b, c int = 1, 2
  fmt.Println(b, c)

  var d = true
  fmt.Println(d)

  var e int
  fmt.Println(e)

  f := "short"
  fmt.Println(f)
}

const s string = "constant"

func Constants() {
  fmt.Println(s)

  const n = 5000000000

  const d = 3e20 / n  // arbitrary precision
  fmt.Println(d)

  fmt.Println(int64(d))

  fmt.Println(math.Sin(n))
}

func For() {
    i := 1
    for i <= 3 {
      fmt.Println(i)
      i = i + 1
    }

    for j := 7; j <= 9; j++ {
      fmt.Println(j)
    }

    for {
      fmt.Println("loop")
      break
    }

    for n := 0; n <= 5; n++ {
      if n%2 == 0 {
        continue
      }
      fmt.Println(n)
    }
}

func IfElse() {
  if 7%2 == 0 {
    fmt.Println("7 is even")
  } else {
    fmt.Println("7 is odd")
  }

  if 8%4 == 0 {
    fmt.Println("8 is divisible by 4")
  }

  if num := 9; num < 0 {
    fmt.Println(num, "is negative")
  } else if num < 10 {
    fmt.Println(num, "has 1 digit")
  } else {
    fmt.Println(num, "has multiple digits")
  }
}

func main() {
  // Hello_world()
  // Values()
  // Variables()
  // Constants()
  // For()
  IfElse()
}
