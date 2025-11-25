// Auto-generated. Do not edit.
declare namespace myExtension {

    /**
     * Sends a raw buffer using the uBit radio datagram.
     * This bypasses the standard MakeCode serial/header limits.
     */
    //% shim=myExtension::sendRawPacket
    function sendRawPacket(data: Buffer): void;

    /**
     * Starts the raw receiver listener in C++.
     * Must be called once before trying to receive data.
     */
    //% shim=myExtension::startRawReceiver
    function startRawReceiver(): void;

    /**
     * Retrieves the last received raw packet from the C++ buffer.
     */
    //% shim=myExtension::getLastRawPacket
    function getLastRawPacket(): Buffer;
}
