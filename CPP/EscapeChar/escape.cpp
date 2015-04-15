#include <iostream>

using namespace std;

string non_escape_string() {
    string tmp_str = "dsafdsfaabcdefgsafdfd";
    tmp_str[3] = '"';
    tmp_str[6] = '\\';
    tmp_str[7] = '"';
    tmp_str[9] = '\\';
    tmp_str[10] = '\\';
    tmp_str[11] = '"';
    //cout<<tmp_str<<endl;
    return tmp_str;
}

/*
 * int escape_string(string& ):
 *      escape double quote for input string
 */
int escape_string(string& str){
    bool escape_flag = false;
    string::iterator it = str.begin();
    while( it != str.end() ){
        switch( *it ) {
        case '\\':
            /* set escape_flag only if in unescaped condition */
            escape_flag = escape_flag ? false :  true;
            break;
        case '"':
            if(escape_flag == false){
                it = str.insert(it, '\\');
                it++;
            }
            break;
        default:
            escape_flag = false;    /* reset escaped flag */
            break;
        }
        it++;                       /* iterate to the next char */
    }
    return 0;
}

int main(int argc, char* argv[]){
    string str = non_escape_string();
    cout<<"Orignal string: "<<str<<endl;
    escape_string(str);
    cout<< "End succeed with result string: "<< str <<"\n";
}
