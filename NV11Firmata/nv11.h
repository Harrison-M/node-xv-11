#ifndef NV11_h
#define NV11_h

#define uint8_t byte

//Constants
#define NV11_ACTIVATE 0x52
#define NV11_DATA 0x53

void setupNV11(byte rx, byte tx);
int availableNV11();
char readNV11();

#endif
