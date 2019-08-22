#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ofstream myfile;            // Create a ofstream object
    myfile.open("example.txt"); // open a file associate with the object
    myfile << "Writing this to a file.\n";
    myfile.close();             // close the object and the file
    return 0;
}
