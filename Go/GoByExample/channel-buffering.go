package main
import "fmt"

func main() {
    messages := make(chan string, 2)

    messages <- "buffered"
    messages <- "channel_1"
    // messages <- "channel_2"
    // messages <- "channel_3"

    fmt.Println(<-messages)
    fmt.Println(<-messages)
    messages <- "channel_2"
    fmt.Println(<-messages)
}
