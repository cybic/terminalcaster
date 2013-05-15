#!/bin/bash

# Start the listerner daemon
socat PIPE:/tmp/termcast tcp:localhost:2000

SOCAT_PROC=$!;

echo "Started $SOCAT_PROC";

# Start typescript
script -c "TERM=xterm-256color screen -S termcast" -f "/tmp/termcast"

sudo kill $SOCAT_PROC
