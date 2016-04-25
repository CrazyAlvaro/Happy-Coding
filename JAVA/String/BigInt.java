class BigInt {
  public static void main(String args[]) {
    int number = 146543;
    System.out.println("number: " + number);
    System.out.println("Expect overflow: " + number + "*" + number + " = " + number*number);
    long num = 146543;
    System.out.println("num: " + num);
    System.out.println("Using long: " + num + "*" + num + " = " + num*num);
  }
}

