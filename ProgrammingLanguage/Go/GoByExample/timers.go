package main

import "time"
import "fmt"

// Timer is useful to set an event in the future
func main() {
    timer1 := time.NewTimer(2 * time.Second)


    <- timer1.C
    fmt.Println("Timer 1 expired")

    timer2 := time.NewTimer(time.Second)

    go func() {
        <- timer2.C
        fmt.Println("Timer2 expired")
    }()

    // cancel timer2
    stop2 := timer2.Stop()
    if stop2 {
        fmt.Println("Timer 2 stopped")
    }
}
