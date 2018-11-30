func twoSum(nums []int, target int) []int {
    val_map := make(map[int]int)

    for index, val := range nums {
        if i, ok := val_map[target - val]; ok {
            return []int{i, index}
        } else {
            val_map[val] = index
        }
    }

    return []int{-1, -1}

}
