import java.util.*;
import java.lang.*;

public class StringToInteger {
  public int myAtoi(String str) {

    // skip(remove) all leading and tailing whitespace
    str = str.trim();
    boolean positive_num = true;

    if(str.length() < 1)
      return 0;

    // if '+' or '-' sign found
    if(str.charAt(0) == '+' || str.charAt(0) == '-') {
      positive_num = str.charAt(0) == '+' ? true : false;
      str = str.substring(1);
    }

    long number = 0;
    for(int i = 0; i < str.length(); i++) {
      if(Character.isDigit(str.charAt(i))) {
        number = number*10 + Character.getNumericValue(str.charAt(i));
        System.out.println(number);
      }
      else {
        break;
      }

      // boundary checking
      if(number > (long)Integer.MAX_VALUE + 1)
        break;
    }

    System.out.println(number);
    if(!positive_num)
      number = -number;

    if(number > Integer.MAX_VALUE)
      return Integer.MAX_VALUE;
    else if(number < Integer.MIN_VALUE)
      return Integer.MIN_VALUE;
    else
      return (int)number;
  }

  public static void main(String[] args) {
    StringToInteger atoi = new StringToInteger();
    int value = atoi.myAtoi("9223372036854775809");
    System.out.println(value);
  }
}
