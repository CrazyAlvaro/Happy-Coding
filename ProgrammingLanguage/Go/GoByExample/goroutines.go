package main

import "fmt"

func f(from string) {
    for i := 0; i < 3; i++ {
        fmt.Println(from, ":", i)
    }
}

func main() {
    f("direct")  // this is a blocking call, running syncrhonously

    // these two function calls are running asynchronously in separate goroutines
    // here asynchronously means order may not being reflected here
    // these two functions are running concurrently
    go f("goroutine")

    go func(msg string) {
        for i := 0; i < 3; i++ {
            fmt.Println(msg, ":", i)
        }
    }("going")

    fmt.Scanln()
    fmt.Println("done")
}
