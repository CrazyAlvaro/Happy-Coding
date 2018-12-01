package main

import "fmt"
import "time"

func worker(done chan bool) {
    fmt.Print("working...")
    time.Sleep(time.Second)
    fmt.Println("done")

    done <- true
}

func main() {
    channel_done := make(chan bool, 1)

    // start a goroutine giving it the channel to notify on
    go worker(channel_done)

    // Block until receive a notification from the chennel 'done'
    <- channel_done
}
