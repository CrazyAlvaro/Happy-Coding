func isPalindrome(x int) bool {
    if x < 0 {
        return false
    }

    num_str := strconv.Itoa(x)

    i, j := 0, len(num_str) -1

    for i < j {
        if num_str[i] != num_str[j] {
            return false
        } else {
            i += 1
            j -= 1
        }
    }

    return true
}
