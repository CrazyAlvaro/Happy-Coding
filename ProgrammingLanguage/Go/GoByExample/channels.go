package main

import "fmt"

func main() {
    // Create a channel
    messages := make(chan string)

    // start a goroutine
    go func() {messages <- "ping"}()

    msg := <- messages
    // by default, sends and receives block until both sender and receiver
    // are ready, used for synchronization at this point

    fmt.Println(msg)
}
