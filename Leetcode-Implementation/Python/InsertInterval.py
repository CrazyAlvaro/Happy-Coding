# Definition for an interval.
# class Interval:
#     def __init__(self, s=0, e=0):
#         self.start = s
#         self.end = e

# Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).
# You may assume that the intervals were initially sorted according to their start times.

class Solution:
    # @param intervals, a list of Intervals
    # @param newInterval, a Interval
    # @return a list of Interval
    def insert(self, intervals, newInterval):
        temp_intervals = []
        new_intervals = []
        for interval in intervals:
            if self.isOverlapped( interval, newInterval ):
                temp_intervals.append( interval )
            else:
                new_intervals.append( interval )

        if len(temp_intervals) == 0:
            new_intervals.append( newInterval )
            sorted(new_intervals, key=lambda interval:interval.start)     # no need to sort it
        else:
            temp_intervals.append(newInterval)
            newInterval = self.combineIntervals( temp_intervals )
            new_intervals.append( newInterval )
            sorted( new_intervals, key=lambda interval:interval.start )
            
        return new_intervals                    

    def combineIntervals(self, intervals):
        """ combine a list of intervals into one interval"""
        if len(intervals) == 0:
            return None

        start, end = intervals[0].start, intervals[0].end
        for interval in intervals:
            start = min( start, interval.start )
            end = max( end, interval.end )
        return Interval(start, end)
        
    def isOverlapped(self, first_interval, sec_interval):
        fir_start, fir_end = first_interval.start, first_interval.end                                
        sec_start, sec_end = sec_interval.start, sec_interval.end
        if fir_start >= sec_start and fir_start <= sec_end:
            return True
        if fir_end >= sec_start and fir_end <= sec_end:
            return True
        if sec_start >= fir_start and sec_start <= fir_end:
            return True
        return False

if __name__ == "__main__":
    inst = Solution()
     
