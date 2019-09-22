// Given a sorted integer array without duplicates, return the summary of its ranges.
// For example, given [0,1,2,4,5,7], return ["0->2","4->5","7"].
import java.util.*;

public class SummaryRanges {
  public List<String> summaryRanges(int[] nums) {
    // loop through array and

    List<String> ranges = new Vector<String>();

    if(nums.length < 1) return ranges;

    int start_num = nums[0], prev_num = nums[0];
    int curr_num;
    String curr_range = Integer.toString(start_num);

    for(int it = 1; it < nums.length; it++) {
      curr_num = nums[it];

      if(curr_num != prev_num + 1) {
        // need to add range
        if(prev_num != start_num)   curr_range = curr_range + "->" + Integer.toString(prev_num);

        ranges.add(curr_range);

        curr_range = Integer.toString(curr_num);
        start_num = curr_num;
        prev_num = curr_num;
      } else {
        // continue
        prev_num = curr_num;
      }
    }

    if(prev_num != start_num) curr_range = curr_range + "->" + Integer.toString(prev_num);

    ranges.add(curr_range);

    return ranges;
  }

  public static void main(String[] args) {
    SummaryRanges instance = new SummaryRanges();
    int nums[] = {0,1,2,4,5,7,8,9};
    List<String> ranges = instance.summaryRanges(nums);
    System.out.println(ranges);
  }
}
