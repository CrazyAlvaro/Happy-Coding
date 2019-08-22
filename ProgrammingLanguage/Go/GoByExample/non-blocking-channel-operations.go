package main

import "fmt"

// basic sends and received on channels are blocking
func main() {
    messages := make(chan string)
    signals := make(chan bool)

    select {
    case msg := <- messages:
        // no msg message
        fmt.Println("received message", msg)
    default:
        fmt.Println("no message received")
    }

    msg := "hi"
    select {
    case messages <- msg:
        fmt.Println("sent message", msg)    // messages has no buffer and there is no receiver
    default:
        fmt.Println("no message sent")
    }

    select {
    case msg := <- messages:
        fmt.Println("received message", msg)
    case sig := <- signals:
        fmt.Println("received message", sig)
    default:
        fmt.Println("no activity")
    }
}
