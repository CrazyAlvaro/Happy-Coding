CXXFILES = example_client.cpp
CC = g++
CXXFLAGS = -Wall -o
TARGET = cass_client
LIBDIR = -L/usr/local/lib64
LIBS = -lcassandra.1.0.1

all:
	$(CC) $(CXXFILES) $(CXXFLAGS) $(TARGET) $(LIBDIR) $(LIBS)

clean:
	rm -f $(TARGET)
