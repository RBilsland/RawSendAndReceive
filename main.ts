/**
 * specific color for these blocks
 */
//% color="#FF5722" weight=100 icon="\uf1eb"
namespace RawRadio {

    /**
     * Send a raw buffer (up to 250 bytes if configured)
     * @param data The buffer to send
     */
    //% block="send raw packet %data"
    //% blockId=raw_radio_send
    export function sendRaw(data: Buffer): void {
        // Call the C++ shim
        myExtension.sendRawPacket(data);
    }

    /**
     * Initialize the raw radio receiver. 
     * Call this in the 'on start' block.
     */
    //% block="start raw receiver"
    //% blockId=raw_radio_start_recv
    export function startReceiver(): void {
        myExtension.startRawReceiver();
    }

    /**
     * Get the data from the last received packet.
     * Returns an empty buffer if no packet is ready.
     */
    //% block="last raw packet"
    //% blockId=raw_radio_get_last
    export function getLastPacket(): Buffer {
        return myExtension.getLastRawPacket();
    }
}
