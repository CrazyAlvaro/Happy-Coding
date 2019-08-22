import java.lang.*;

// Return 0 when overflow
public class ReverseInteger {
  public int reverse(int x) {
    int original_value = x;
    long result = 0;
    boolean negative = x < 0;
    x = Math.abs(x);

    while(x != 0){
      result *= 10;

      result += x%10;
      x /= 10;
    }

    int reversed_number;
    if(result > Integer.MAX_VALUE || result < 0)
      reversed_number = 0;
    else
      reversed_number = negative ? (int) -result : (int) result;

    System.out.println("Orignal number is: " + original_value + " And reversed number is: " + reversed_number);
    return reversed_number;
  }

  public static void main(String[] args) {
    ReverseInteger instance = new ReverseInteger();
    instance.reverse(100);
    instance.reverse(123);
    instance.reverse(-123);
    instance.reverse(431);
    instance.reverse(1534236469);
    instance.reverse(-2147483648);
  }
}
