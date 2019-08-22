
NUM= 0
PLUS= 1
MINUS= 2
MULTIPLE= 3
DIVIDE= 4

class Solution:
    # @param tokens, a list of string
    # @return an integer
    def evalRPN(self, tokens):
        nums_stack = []
        if len(tokens) == 0:    return 0

        for idx in range(len(tokens)):
            tokenType = self.getTokenType( tokens[idx] )
            if tokenType != NUM: 
                self.caculate( tokenType, nums_stack )
            else:
                number = int( tokens[idx] )
                nums_stack.append(number)
        return nums_stack[0]

    def getTokenType(self, token):
        if token == '+':
            return PLUS
        elif token == '-':
            return MINUS
        elif token == '*':
            return MULTIPLE
        elif token == '/':
            return DIVIDE
        else:
            return NUM
        
    def caculate(self, tokenType, nums_stack):
        if len(nums_stack) < 2:
            print "nums_stack input error!"
            return
        first_num, second_num = nums_stack[-2], nums_stack[-1]
        nums_stack.pop()
        nums_stack.pop()

        if tokenType == PLUS:
            ret = first_num + second_num
        elif tokenType == MINUS:
            ret = first_num - second_num
        elif tokenType == MULTIPLE:
            ret = first_num * second_num
        elif tokenType == DIVIDE:
            #print first_num, second_num
            ret = int(float(first_num)/second_num)  # negative round down

        #print tokenType, ret
        nums_stack.append(ret)
        

    
####################################
#
#   Test
#
#
####################################

if __name__ == "__main__":
    inst = Solution()
    notions = ["2", "1", "+", "3", "*"]
    ret = inst.evalRPN(notions)
    print str(ret), " expect 9"

    notions =["10","6","9","3","+","-11","*","/","*","17","+","5","+"] 
    ret = inst.evalRPN(notions)
    print str(ret), " expect 22"
