#include <string>
#include <cstring>
#include <iostream>

using namespace std;

int main(){
    string str = "This is an encoded \\\"quotation\\\" string";
    cout<<"This is CPP style string"<<str<<endl;
    char * string_array = new char [str.length() + 1];
    strcpy(string_array, str.c_str());
    cout<<"This is CPP style string"<<string_array << "\n";
    return 0;
}
