#include <iostream>
#include <string>

using namespace std;

int main() {
    while(1) {
        string input_string;
        cout<<"Please input a string:\n";
        if(cin >> input_string) {
            cout<<"Input string is:"<<input_string<<endl;
        } else {
            cerr<<"Input error"<<endl;
        }
        try {
            int input_int;
            cout<<"Please input a integer:\n";
            if(cin >> input_int) {
                cout<<"Input integer is:"<<input_int<<endl;
            } else {
                cerr<<"Input error"<<endl;
            }
        } catch(const ios_base::failure& e) {

        }

        cout<<"Input \"exit\" to exit this program, otherwise continue:\n";
        cin >> input_string;
        if(input_string == "exit") {
            break;
        }
    }
}
