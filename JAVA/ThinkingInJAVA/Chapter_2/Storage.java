import java.util.*;

class Storage {
  int storage(String s) {
    return s.length() * 2;
  }

  public static void main(String[] args) {
    Storage st = new Storage();
    System.out.println("double length of \"abc\" is: " + st.storage("abc"));
  }
}
