// https://gobyexample.com/

//[X]  Hello World 11/28/18
//[X]  Values
//[X]  Variables
//[X]  Constants
//[X]  For
//[X]  If/Else
//[X]  Switch
//[X]  Arrays
//[X]  Slices
//[X]  Maps
//[X]  Range
//[X]  Functions
//[X]  Multiple Return Values
//[X]  Variadic Functions
//[X]  Closures
//[X]  Recursion
//[X]  Pointers
//[X]  Structs
//[X]  Methods
//[X]  Interfaces
//[X]  Errors
//[X]  Goroutines
//[X]  Channels
//[X]  Channel Buffering
//[X]  Channel Synchronization
//[X]  Channel Directions
//[X]  Select
//[X]  Timeouts
//[X]  Non-Blocking Channel Operations
//[X]  Closing Channels
//[X]  Range over Channels
//[X]  Timers
//[X]  Tickers
//[X]  Worker Pools
//[X]  Rate Limiting
//[X]  Atomic Counters
//[X]  Mutexes
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
import "time"

// helper functions
func my_print(vals ...string) {
    vals_len := len(vals)
    for index, val := range vals {
        fmt.Print(val)
        if index != vals_len - 1 {
            fmt.Print(" ")
        }
    }
    fmt.Print("\n")
}

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


func Switch() {
    i := 2
    fmt.Print("Write ", i, " as ")
    switch i {
    case 1:
        fmt.Println("one")
    case 2:
        fmt.Println("two")
    case 3:
        fmt.Println("three")
    }

    switch time.Now().Weekday() {
    case time.Saturday, time.Sunday:
        fmt.Println("It's the weekend")
    default:
        fmt.Println("It's a weekday")
    }

    // Like if-else
    t := time.Now()
    switch {
    case t.Hour() < 12:
        fmt.Println("It's before noon")
    default:
        fmt.Println("It's after noon")
    }

    // TODO: what's this interface
    whatAmI := func(i interface{}) {
        switch t := i.(type) {
        case bool:
            fmt.Println("I'm a bool")
        case int:
            fmt.Println("I'm a int")
        default:
            fmt.Println("Don't know type %s\n", t)
        }
    }
    whatAmI(true)
    whatAmI(1)
    whatAmI("hey")
}

func Array() {
    var a [5]int
    fmt.Println("emp:", a)

    a[4] = 100
    fmt.Println("set:", a)
    fmt.Println("get:", a[4])

    fmt.Println("len:", len(a))

    b := [5]int{1, 2, 3, 4, 5}
    fmt.Println("dcl:", b)

    var twoD [2][3]int

    for i := 0; i < 2; i++ {
        for j := 0; j < 3; j++ {
            twoD[i][j] = i + j
        }
    }
    // fmt.Println(twoD)
    fmt.Println("2d: ", twoD)

}

func Slices() {
    s := make([]string, 3)
    fmt.Println("emp:", s)

    // set like arrays
    s[0] = "a"
    s[1] = "b"
    s[2] = "c"
    fmt.Println("set:", s)
    fmt.Println("get:", s[2])

    fmt.Println("len:", len(s))

    s = append(s, "d")
    s = append(s, "e", "f")
    fmt.Println("apd:", s)

    // copy slices
    c := make([]string, len(s))
    copy(c, s)

    // slice
    l := s[2:5]
    fmt.Println("sl1:", l)

    fmt.Println("sl:", l)
    fmt.Println("s:", s)

    t := []string{"g", "h", "i"}
    fmt.Println("t:", t)
}

func Map() {
    m := make(map[string]int)

    m["k1"] = 7
    m["k2"] = 13

    fmt.Println("map:", m)

    v1 := m["k1"]
    fmt.Println("v1: ", v1)
    fmt.Println("len:", len(m))

    delete(m, "k2")
    fmt.Println("map:", m)

    _, prs := m["k2"]
    fmt.Println("prs:", prs)

    n := map[string]int{"foo": 1, "bar": 2}
    fmt.Println("map:", n)
}

func Range() {

    nums := []int{2, 3, 4}
    sum := 0
    for _, num := range nums {
        sum += num
    }
    fmt.Println("sum", sum)

    for i, num := range nums {
        if num == 3 {
            fmt.Println("index:", i)
        }
    }

    kvs := map[string]string{
        "a": "apple",
        "b": "banana",
    }

    for k, v := range kvs {
        fmt.Printf("%s -> %s\n", k, v)
    }

    for k := range kvs {
        fmt.Println("key:", k)
    }

    for i, c := range "go" {
        fmt.Println(i, c)
    }
}

/* Functions */
// Explicit return type
func plus(a int, b int) int {
    return a + b
}

func plusPlus(a, b, c int) int {
    return a + b + c
}

func Function() {
    res := plus(1, 2)
    fmt.Println("1+2=", res)

    res = plusPlus(1, 2, 3)
    fmt.Println("1+2+3=", res)
}
func vals() (int, int) {
    return 3, 7
}

func MultipleReturn() {
    a, b := vals()
    fmt.Println(a)
    fmt.Println(b)

    _, c := vals()
    fmt.Println(c)
}

func sum(nums ...int) {
    fmt.Print(nums, " ")
    total := 0
    for _, num := range nums {
        total += num
    }
    fmt.Println(total)
}

func Variadic() {
    sum(1, 2)
    sum(1, 2, 3)

    nums := []int{1, 2, 3, 4}   // nums is a slice
    sum(nums...)                // call like this
}

func intSeq() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}

func Closure() {
    nextInt := intSeq()

    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

    newInts := intSeq()
    fmt.Println(newInts())
}

func fact(n int) int {
    if n == 0 {
        return 1
    }
    return n * fact(n-1)
}

func Recursion() {
    fmt.Println(fact(7))
}

func zeroval(ival int) {
    ival = 0
}

func zeroptr(iptr *int) {
    *iptr = 0
}

func Pointer() {
    i := 1
    fmt.Println("initial:", i)

    zeroval(i)
    fmt.Println("zeroval:", i)

    zeroptr(&i)
    fmt.Println("zeroptr:", i)

    fmt.Println("pointer:", &i)
}

type person struct {
    name string
    age int
}

func Struct() {
    fmt.Println(person{"Bob", 20})

    fmt.Println(person{name: "Alice", age: 30})

    fmt.Println(person{name: "Fred"})

    fmt.Println(person{age: 10})

    fmt.Println(&person{name: "Ann", age: 40})

    s := person{name: "Sean", age: 50}
    fmt.Println(s.name)

    sp := &s
    fmt.Println(sp.age)

    sp.age = 51
    fmt.Println(sp.age)

    fmt.Println(s)
}

type rect struct {
    width, height int
}

func (r *rect) area() int {
    return r.width * r.height
}

func (r rect) perim() int {
    return 2*r.width + 2*r.height
}

func Method() {
    r := rect{width: 10, height: 5}

    fmt.Println("area: ", r.area())
    fmt.Println("perim:", r.perim())

    rp := &r
    fmt.Println("area: ", rp.area())
    fmt.Println("perim:", rp.perim())
}

type geometry interface {
    area() float64
    perim() float64
}

type rectan struct {
    width, height float64
}

type circle struct {
    radius float64
}

func (r rectan) area() float64 {
    return r.width * r.height
}

func (r rectan) perim() float64 {
    return 2*r.width + 2*r.height
}

func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}

func (c circle) perim() float64 {
    return 2 * math.Pi * c.radius
}

func measure(g geometry) {
    fmt.Println(g)
    fmt.Println(g.area())
    fmt.Println(g.perim())
}

func Interfaces() {
    r := rectan{width: 3, height: 4}
    c := circle{radius: 5}

    measure(r)
    measure(c)
}

func main() {
    // Helper
    // my_print("2", "3")


    // Hello_world()
    // Values()
    // Variables()
    // Constants()
    // For()
    // IfElse()
    // Switch()
    // Array()
    // Slices()
    // Map()
    // Range()
    // Function()
    // MultipleReturn()
    // Variadic()
    // Closure()
    // Recursion()
    // Pointer()
    // Struct()
    // Method()
    // Interfaces()
    // errors.go
}
