DEPS = Cassandra.h
CXXFILES = Cassandra.cpp
CC = g++
CXXFLAGS = -Werror -g -v -o
TARGET = execute_example
LIBDIR = -L/usr/local/lib64
LIBS = /usr/local/lib64/libcassandra.2.dylib

all: $(DEPS)
	$(CC) $(CXXFILES) $(CXXFLAGS) $(TARGET) $(LIBDIR) /usr/local/lib/libuv.a $(LIBS)

clean:
	rm -f $(TARGET)
