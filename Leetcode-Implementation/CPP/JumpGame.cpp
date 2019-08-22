class Solution {
public:
    bool canJump(int A[], int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<bool> path( n, false);
        path[0] = true;
        int furthest = 0;
        for( int it = 0; it <n; it++){
            if( path[it] == true && (it+A[it]) > furthest ){
                
                for( int step = furthest; step <= it + A[it]; step++){
                    if( step >= n )
                        break;
                    path[step] = true;
                }
                furthest = it + A[it];
            }
            else if( path[it] == false )
                break;
            else
                continue;
        }
        return path[n-1];  
    }
};
