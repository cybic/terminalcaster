#!/bin/bash

# Start the listerner daemon
sudo socat TCP-LISTEN:23,fork EXEC:"tail -f /tmp/termcast" &

SOCAT_PROC=$!;

echo "Started $SOCAT_PROC";

# Start typescript
script -c "TERM=xterm-256color screen -S termcast" -f "/tmp/termcast"

sudo kill $SOCAT_PROC
