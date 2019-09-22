class Solution:
    # @param s, a string
    # @return a string
    def reverseWords(self, s):
        # divede string by whitespace to list, then reverse it ?
        print "split()"

        print " ".join( reversed(s.split()))

        print "rsplit()"

        print " ".join( s.rsplit())

if __name__ == "__main__":
    string = " my first string "
    inst = Solution()
    inst.reverseWords( string)
