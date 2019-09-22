import java.util.*;


// Definition for singly-linked list.
public class MergeTwoSortedLists {
  public static class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
  }

  public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode sentry = new ListNode(0);
    ListNode current = sentry;

    while(l1 != null && l2 != null) {
      if(l1.val <= l2.val){
        current.next = l1;
        current = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        current = l2;
        l2 = l2.next;
      }
    }

    current.next = l1 == null ? l2 : l1;

    return sentry.next;
  }

  public static void main(String[] args) {
    MergeTwoSortedLists mergeLists = new MergeTwoSortedLists();

    ListNode l1 = null;
    ListNode l2 = new ListNode(0);

    ListNode newHead = mergeLists.mergeTwoLists(l1, l2);

    while( newHead != null ){
      System.out.println(newHead);
      newHead = newHead.next;
    }

  }
}
