import java.util.*;

class RandomDouble {
  private static Random random = new Random();

  public interface DoubleGenerator { double next(); }

  public static class RandDoubleGenerator implements DoubleGenerator {
    public double next() { return random.nextDouble(); }
  }

  public static String toString(double[] a) {
    StringBuffer result = new StringBuffer("[");
    for(int i = 0; i < a.length; i++) {
      result.append(a[i]);
      if(i < a.length - 1)
        result.append(", ");
    }
    result.append("]");
    return result.toString();
  }

  public static void main(String[] args) {
    int size = 10;
    double[] doubleArray = new double[size];
    DoubleGenerator gen = new RandDoubleGenerator();

    for(int i = 0; i < size; i++) {
      doubleArray[i] = gen.next();
    }

    System.out.println(toString(doubleArray));
  }
}
