package main

import "time"
import "fmt"

func main() {
    ticker := time.NewTicker(500 * time.Millisecond)

    go func() {
        // do something at a time interval
        for t := range ticker.C {
            fmt.Println("Tick at", t)
        }
    }()

    // use time to sleep a while
    time.Sleep(1600 * time.Millisecond)

    // then stop the ticker
    ticker.Stop()
    fmt.Println("Ticker stopped")
}
