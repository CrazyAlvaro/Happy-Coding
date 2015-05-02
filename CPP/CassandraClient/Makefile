CXXFILES = cassandra_client.cpp
CC = g++
CXXFLAGS = -Wall -g -o
TARGET = execute_example
LIBDIR = -L/usr/local/lib64
LIBS = -lcassandra

all:
	$(CC) $(CXXFILES) $(CXXFLAGS) $(TARGET) $(LIBDIR) $(LIBS)

clean:
	rm -f $(TARGET)
