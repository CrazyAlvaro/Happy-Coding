import java.util.*;

public class RandomString {
  public static String randomString(int i) {
    Random ran = new Random(i);
    StringBuilder sb = new StringBuilder();

    for(int n = 0; ; n++) {
      int k = ran.nextInt(27);
      if(k == 0)
        break;
      
      System.out.println(k);
      sb.append((char)('`'+k));
    }

    return sb.toString();
  }

  public static void main(String[] args) {
    System.out.println(randomString(-229985452) + " " + randomString(-147909649));
  }
}
