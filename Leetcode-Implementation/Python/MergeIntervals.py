# Definition for an interval.
# class Interval:
#     def __init__(self, s=0, e=0):
#         self.start = s
#         self.end = e

class Solution:
    # @param intervals, a list of Interval
    # @return a list of Interval
    def merge(self, intervals):
        """ merge a list of intervals"""
        # sort intervals key as start
        intervals = sorted(intervals, key=lambda interv: interv.start)

        if len(intervals) == 0:
            return intervals

        combined_intervals = [] 
        curr_interval = intervals[0]
        for idx in range(1, len(intervals) ):
            if self.isOverlapped( curr_interval, intervals[idx] ):
                curr_interval = self.combineTwoIntervals( curr_interval, intervals[idx] )
            else:
                combined_intervals.append( curr_interval )
                curr_interval = intervals[idx]
        combined_intervals.append(curr_interval)

        return combined_intervals


    def isOverlapped(self, fir_interval, sec_interval ):
        """ 
        check whether two intervals are overlapped
        """
        if fir_interval == None or sec_interval == None \
            or sec_interval.end < fir_interval.start \
            or sec_interval.start > fir_interval.end:
            return False
        return True

    def combineTwoIntervals(self, fir, sec ):
        """
        combine two overlapped intervals
        return a new interval if overlapped, otherwise None
        """
        if fir == None or sec == None \
            or not self.isOverlapped( fir, sec ):
            return None
        
        start = min(fir.start, sec.start)
        end   = max(fir.end,   sec.end)

        new_interval = Interval(start, end)
        return new_interval
        

            
