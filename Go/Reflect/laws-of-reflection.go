package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io"
	"os"
	"reflect"
)

// Go is statically typed
type MyInt int

var i int
var j MyInt

// interface types

// Reader is the interface that wraps the Read method
type Reader interface {
	Read(p []byte) (n int, err error)
}

// Write is the interface that wraps the Write method
type Writer interface {
	Write(p []byte) (n int, err error)
}

func interfaceExplain() {
	var r io.Reader

	// r can hold any value whose type has a Read method
	r = os.Stdin
	r = bufio.NewReader(r)
	r = new(bytes.Buffer)
}

func representation() (interface{}, error) {
	var r io.Reader
	tty, err := os.OpenFile("/dev/tty", os.O_RDWR, 0)
	if err != nil {
		return nil, err
	}
	r = tty // r(interface type) contains (value, type) pair, (tty, *os.File)

	var w io.Writer
	w = r.(io.Writer) // type assertion

	// The static type of the interface determines what methods may be invoked with an interface
	// even though value inside may have a larger set of methods

	var empty interface{}
	empty = w // also (tty, *os.File)

	// IMPORTANT: the pair inside an interface always has the form (value, concrete type) and
	// cannot have the form (value, interface type). Interfaces do not hold interface values

	return empty, nil
}

// The First law of reflection:
// Reflection goes from interface value to reflection object
func typeOf() {
	var x float64 = 3.4

	// TypeOf returns the reflection Type:
	// func TypeOf(i interface{}) Type
	fmt.Println("type:", reflect.TypeOf(x))

	fmt.Println("value:", reflect.ValueOf(x).String())

	v := reflect.ValueOf(x)
	fmt.Println("type:", v.Type())
	fmt.Println("kind is float64:", v.Kind() == reflect.Float64)
	fmt.Println("value:", v.Float())

}

// The second law of reflection
// Reflection goes from reflection object into interface value
func toInterface() {
	var x float64 = 3.4
	v := reflect.ValueOf(x)

	y := v.Interface().(float64)
	fmt.Println(y)

	fmt.Println(v.Interface())
	fmt.Println(v)

	// interface method is the reverse of the ValueOf function
}

// The third law of reflection
// To modify a reflection object, the value must be settable
func modifyReflection() {
	var x float64 = 3.4
	v := reflect.ValueOf(x)
	fmt.Println("settability of v:", v.CanSet()) // false, because ValueOf pass a copy of x
	// v.SetFloat(7.1) // because x is not settable

	p := reflect.ValueOf(&x)
	fmt.Println("type of p:", p.Type())
	fmt.Println("settability of p:", p.CanSet()) // vp is a pointer

	va := p.Elem() // indirects through the pointer, and save the result in a reflection value
	fmt.Println("settability of va:", va.CanSet())
	va.SetFloat(7.1)
	fmt.Println(va.Interface())
	fmt.Println(x)

	// reflection values need the address of something in order to modify what they represent
}

// structs
func typeStruct() {
	type T struct {
		// upper case exported
		A int
		B string
	}
	t := T{23, "skidoo"}
	s := reflect.ValueOf(&t).Elem()
	typeOfT := s.Type()
	for i := 0; i < s.NumField(); i++ {
		f := s.Field(i)
		fmt.Printf("%d: %s %s = %v\n", i,
			typeOfT.Field(i).Name, f.Type(), f.Interface())
	}

	s.Field(0).SetInt(77)
	s.Field(1).SetString("Sunset Strip")
	fmt.Println("t is now", t)
}

func main() {
	// reflection is an example of metaprogramming
	// typeOf()
	// toInterface()
	// modifyReflection()
	typeStruct()

	// interface value -> reflection object
	// reflection object -> interface value
	// modify a reflection object, must be settable
}
