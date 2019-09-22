class Solution:
    """ return a list of lists of integer"""
    def generateMatrix(self, n):
        """ function generate spiral matrix """
        # do it from outer loop to inner loop 
        # total number need to fill in each loop is 1:1 2:4 3:8 4:12 5:16
        # except for 1,  x x-1 x-1 x-2

        #initialize 
        matrix = [ [0 for x in range(n)] for x in range(n) ]
        for i in range(n):
            for j in range(n):
                #print matrix[i][j]
                pass

        counter = 1
        length = n
        for start in range( 0, n/2):
            i, j = start, start
            #print length
            if length == 1:
                matrix[i][j] = counter
                counter += 1
                break

            for right in range( 0, length ):
                if j == n:
                    print str(right) +" quit right"
                    return
                matrix[i][j] = counter
                j += 1
                counter += 1
                #print str(i)+" "+str(j)
            j -=1
            for down in range( 0, length - 1):
                if i == n or j == n:
                    print str(down)+" quit down"+"i:"+str(i) +"j:"+str(j)
                    return
                i += 1
                matrix[i][j] = counter
                counter += 1
                #print str(i)+" "+str(j)
            i -= 1
            for left in range( 0, length - 1):
                if j < 0:
                    print str(left)+" quit left"
                    return
                matrix[i][j] = counter
                j -= 1
                counter += 1
            j += 1
            for up in range(0, length - 2):
                if i < 0:
                    print str(up) +" quit up"
                    return
                i -= 1
                matrix[i][j] = counter
                counter += 1
            length = length - 2
        
        for i in range(n):
            for j in range(n):
                print matrix[i][j]
            #print "\n"
         
                 

            


if __name__ == "__main__":
	inst = Solution()
	inst.generateMatrix(5)
