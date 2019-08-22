
#Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
#The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

class Solution:
    # @return a boolean
    def isValid(self, s):
        """
        Check valid parentheses
        """

        counter = [0,0,0]
        paren_stack = []
        for idx in range( len(s) ):
            if s[idx] =="(":
                paren_stack.append("(")
            elif s[idx] ==")":
                if  len(paren_stack) < 1 or paren_stack[-1] !="(":
                    return False
                else:
                    paren_stack.pop()
            elif s[idx] =="[":
                paren_stack.append("[")
            elif s[idx] =="]":
                if  len(paren_stack) < 1 or paren_stack[-1] !="[":
                    return False
                else:
                    paren_stack.pop()
            elif s[idx] =="{":
                paren_stack.append("{")
            elif s[idx] =="}":
                if  len(paren_stack) < 1 or paren_stack[-1] !="{":
                    return False
                else:
                    paren_stack.pop()
            else:
                pass
        
        if len(paren_stack) == 0:
            return True
        else:
            return False
