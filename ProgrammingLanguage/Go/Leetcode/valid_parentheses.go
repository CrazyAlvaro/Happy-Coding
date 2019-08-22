func isValid(s string) bool {
    // use a stack
    parenth_map := map[rune]rune{']': '[', '}': '{', ')': '('}
    stack := []rune{}

    for _, char := range s {
        if char == '{' || char == '(' || char == '[' || len(stack) == 0 {
            stack = append(stack, char)
        } else if stack[len(stack)-1] == parenth_map[char] {
            stack = stack[:len(stack) - 1]
        } else {
            return false
        }
    }

    return len(stack) == 0

}
