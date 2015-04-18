#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main()
{
    string str;
    float price = 0;
    int quantity = 0;

    cout << "Enter price: ";
    getline (cin, str);
    stringstream(str) >> price;
    cout << "Enter quantity: ";
    getline (cin, str);
    stringstream(str) >> quantity;
    cout << "Total price: "<< price * quantity << endl;
    return 0;
}
