#include <iostream>

class Base
{
public:
    virtual ~Base();

private:

};

Base::~Base()
{
    std::cout<<"Base class destructor been called!\n";
}

class Derived_first : public Base
{
public:
    ~Derived_first();
};

Derived_first::~Derived_first()
{

    std::cout<<"Derived_first class destructor been called!\n";
}

class Derived_second : public Derived_first 
{
public:
    ~Derived_second();
};

Derived_second::~Derived_second()
{
    std::cout<<"Derived_second class destructor been called!\n";
}


int main(int argc, char* argv[]){
    Base *inst = new Derived_second();
    delete inst; 
}
