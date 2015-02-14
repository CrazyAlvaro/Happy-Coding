/**
 *  EnumerationIterator adapter
 */

public class EnumerationIterator implements Iterator
{
  Enumeration enum;

  /**
   *  The Enumeration we're adapting, We're using composition so we stash it in an instance variable
   */
  public EnumerationIterator(Enumeration enum) {
    this.enum = enum;
  }
  
  /**
   *  hasNext() is delegated to the Enumeration's hasMoreElements() method
   */
  public boolean hasNext() {
    return enum.hasMoreElements();
  }

  /**
   *  the Iterator's next() method is delegated to the Enumeration's nextElement() method
   */
  public Object next() {
    return enum.nextElement();
  }

  /**
   *  we can't support iterator's remove method
   */
  public void remove() {
    throw new UnsupportedOperationException();
  }
}
