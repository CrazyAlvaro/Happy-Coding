class StaticTest {
  static int i = 47;
}

class StaticFun {
  static void incr() {
    StaticTest.i++;
  }

  public static void main(String[] args) {
    System.out.println(StaticTest.i);
    incr();
    System.out.println(StaticTest.i);
  }
}

