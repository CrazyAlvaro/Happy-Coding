#include<iostream>
using namespace std;

class A {
public:
    virtual void f() {
        cout << "A" << endl;
    }
};

class B : public A {
public:
    void f() {
        cout << "B" << endl;
    }
};

class C : public B {
public:
    void f() {
        cout << "C" << endl;
    }
};

int main(int argc, char* argv[]){
    B* x = new C;
    x->f();
}
