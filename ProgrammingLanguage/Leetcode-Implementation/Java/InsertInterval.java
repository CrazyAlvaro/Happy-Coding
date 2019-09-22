import java.util.*;

/**
 * Definition for an interval.
 * public class Interval {
 *     int start;
 *     int end;
 *     Interval() { start = 0; end = 0; }
 *     Interval(int s, int e) { start = s; end = e; }
 * }
 */
public class InsertInterval {

  public static class Interval {
    int start;
    int end;
    Interval() { start = 0; end = 0; }
    Interval(int s, int e) { start = s; end = e; }
    public String toString() {
      return "Interval: start " + this.start + " end " + this.end;
    }
  }



  /**
   * Assume intervals are non-overlapping intervals, and originally sorted by start times
   */
  public List<Interval> insert(List<Interval> intervals, Interval newInterval) {
    List<Interval> newList = new ArrayList<Interval>();

    int i = 0;
    while(i < intervals.size() && newInterval.start > intervals.get(i).end) {
      newList.add(intervals.get(i));
      i++;
    }

    while(i < intervals.size() && newInterval.end >= intervals.get(i).start) {
      newInterval.start = Math.min(newInterval.start, intervals.get(i).start);
      newInterval.end = Math.max(newInterval.end, intervals.get(i).end);
      i++;
    }

    newList.add(newInterval);

    while(i < intervals.size()) {
      newList.add(intervals.get(i));
      i++;
    }

    return newList;
  }

  /**
   * Old solution:
   *public List<Interval> insert(List<Interval> intervals, Interval newInterval) {
   *  List<Interval> newList = new ArrayList<Interval>();

   *  // Merge all intervals if necessary, delete from intervals
   *  for(int i = 0; i < intervals.size(); i++) {
   *    if(isOverlapped(intervals.get(i), newInterval)) {
   *      newInterval = combineIntervals(intervals.get(i), newInterval);
   *    }
   *    else {
   *      newList.add(intervals.get(i));
   *    }
   *  }

   *  // Insert newInterval to intervals
   *  insertToSortedIntervals(newList, newInterval);
   *  System.out.println(newList);
   *  return newList;
   *}
  */

  public boolean isOverlapped(Interval first, Interval second) {
    System.out.println("isOverlapped called: " + first + " " + second);
    if(first.start >= second.start && first.start <= second.end
        || first.end >= second.start && first.end <= second.end
        || second.start >= first.start && second.start <= first.end
        || second.end >= first.start && second.end <= first.end) {
      return true;
        }
    else {
      return false;
    }
  }

  public Interval combineIntervals(Interval first, Interval second) {
    first.start = first.start < second.start ? first.start : second.start;
    first.end = first.end > second.end ? first.end : second.end;

    return first;
  }

  public void insertToSortedIntervals(List<Interval> intervals, Interval newInterval) {
    // find the position to insert use liniear search
    for(int i = 0; i < intervals.size(); i++) {
      if(newInterval.end < intervals.get(i).start) {
        intervals.add(i, newInterval);
        newInterval = null;
        break;
      }
    }

    // Add to the end
    if(newInterval != null) {
      intervals.add(newInterval);
    }
  }

  public static void main(String[] args) {
    InsertInterval insert_interval = new InsertInterval();
    Interval[] intervals_array = {new Interval(1,5)};
    List<Interval> list = new ArrayList<Interval>(Arrays.asList(intervals_array));
    Interval newInterval = new Interval(6,8);
    insert_interval.insert(list, newInterval);
  }
}
