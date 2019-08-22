import "math"

func reverse(x int) (res int) {
    for ; x != 0; x /= 10 {
        res = res * 10 + x % 10
        if res > math.MaxInt32 || res < math.MinInt32 {
            return 0
        }
    }
    return res
}
