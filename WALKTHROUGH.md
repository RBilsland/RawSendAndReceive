# Walkthrough: Long String Radio Extension Fixes

I have reviewed and fixed the extension to ensure it correctly supports sending and receiving longer strings (up to ~250 bytes) on the micro:bit.

## Changes Made

### 1. Fixed `pxt.json` Configuration
The `pxt.json` file was referencing non-existent files (`radio.cpp`, `my-custom-math.h`, etc.) and missing the actual source files.
- **Removed**: `radio.cpp`, `my-custom-math.h`, `my-custom-math.cpp`
- **Added**: `receiver.cpp`, `myExtension.cpp`

This ensures the C++ code is actually compiled and included in the extension.

### 2. Enabled Radio on Send
In `myExtension.cpp`, I added a call to `uBit.radio.enable()` in `sendRawPacket`.
- This ensures that if a user tries to send a packet before explicitly starting the receiver, the radio is turned on and configured with defaults.

### 3. Increased Transmit Power
In `receiver.cpp`, I added `uBit.radio.setTransmitPower(7)` to `startRawReceiver`.
- This sets the radio transmission power to the maximum level (7), which is recommended when sending larger packets to ensure better reliability and range.

### 4. Verified Packet Size Configuration
I verified that `config.json` correctly sets the maximum packet size to 254 bytes:
```json
"microbit-dal": {
    "radio": {
        "max_packet_size": 254
    }
}
```
This compile-time configuration is crucial for allowing the underlying radio hardware to accept packets larger than the standard 32 bytes.

## How to Use

1.  **Sender**:
    ```typescript
    // You can just send data, the radio will auto-enable
    let msg = Buffer.create(200);
    msg.fill(65); // Fill with 'A'
    RawRadio.sendRaw(msg);
    ```

2.  **Receiver**:
    ```typescript
    // In 'on start'
    RawRadio.startReceiver();

    // In 'on radio received' (standard block) or loop
    basic.forever(function() {
        let buf = RawRadio.getLastPacket();
        if (buf.length > 0) {
            // Process buffer
            serial.writeLine("Received " + buf.length + " bytes");
        }
    })
    ```
