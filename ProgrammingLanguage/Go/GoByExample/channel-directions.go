package main

import "fmt"

/*
    pings is channel for sending
*/
func ping(pings chan<- string, msg string) {
    pings <- msg
    // new_msg := <- pings // invalid operation
}

/*
    pings is channel for receiving
    pongs is channel for sending
*/
func pong(pings <-chan string, pongs chan<- string) {
    msg := <- pings
    // pings <- msg // invalid operation
    pongs <- msg
}

func main() {
    pings := make(chan string, 1)
    pongs := make(chan string, 1)

    ping(pings, "passed message")
    pong(pings, pongs)
    fmt.Println(<-pongs)
}
