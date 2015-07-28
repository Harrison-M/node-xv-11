#include <Arduino.h>
#include <SoftwareSerial.h>

#include "nv11.h"

SoftwareSerial *nv11Serial = NULL;
bool nv11IsSetup = false;

void setupNV11(byte rx, byte tx) {
    pinMode(rx, INPUT);
    pinMode(tx, OUTPUT);
    nv11Serial = new SoftwareSerial(rx, tx);
    nv11Serial->begin(115200);
    nv11IsSetup = true;
}

int availableNV11() {
    if (nv11IsSetup) {
        return nv11Serial->available();
    }
    return 0;
}

char readNV11() {
    return nv11Serial->read();
}
