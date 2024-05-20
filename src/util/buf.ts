const oneByteNumToBuf = (num: number) => {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(num, 0);
    return buf;
}

export {
    oneByteNumToBuf
}