package main

import "time"
import "fmt"

func main() {

    /*
     * first type
     */
    requests := make(chan int, 5)
    for i := 1; i<= 5; i++ {
        requests <- i
    }
    close(requests)

    // Create a limiter using Tick mechanism
    limiter := time.Tick(200 * time.Millisecond)

    // Receive a request every Tick's time interval
    for req := range requests {
        // blocking on a receive from the limiter channel before serving each request
        // limit 1 request every 200 milliseconds
        <- limiter
        fmt.Println("request", req, time.Now())
    }

    fmt.Println("\n")

    /*
     * second type
     */
    burstyLimiter := make(chan time.Time, 3)

    // bursty capability
    for i := 0; i < 3; i++ {
        burstyLimiter <- time.Now()
    }

    go func() {
        for t := range time.Tick(1200 * time.Millisecond) {
            burstyLimiter <- t
        }
    }()

    burstyRequests := make(chan int, 10)
    go func() {
        for i := 1; i<= 18; i++ {
            if i % 5 == 0 {
                time.Sleep(3 * time.Second)
            }
            burstyRequests <- i
        }
        close(burstyRequests)
    }()

    for req := range burstyRequests {
        <-burstyLimiter
        fmt.Println("request", req, time.Now())
    }
}
