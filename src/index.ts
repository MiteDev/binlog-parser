import * as fs from 'fs';
import * as util from 'util';
import {unpack} from 'python-struct';

const event_header_len = 19;
let file_pointer = 0;

const magicNumber = (buf: Buffer) => {
    const magic = buf.subarray(0, 22);
    return magic
}


const headerFunc = (magic: Buffer, buf: Buffer) => {
    file_pointer += magic.length;

    const header = buf.subarray(4, 23); // after 4byte
    console.log(header)

    file_pointer += event_header_len;

    const u = unpack('<IB3IH', header); // Little-Endian unsigned Int 4 Byte, unsigned char 1 Byte, unsigned Int 4 Byte, unsigned Int 4 Byte, unsigned Int 4 Byte, unsigned short 2 Byte
    const timestamp = Number(u[0]) * 1000;
    const event_type = u[1];
    const server_id = u[2];
    const event_size = u[3];
    const log_pos = u[4];

    console.log(`timestamp: ${timestamp}\nevent_type: ${event_type}\nserver_id: ${server_id}\nevent_size: ${event_size}\nnext_log_pos: ${log_pos}`)

    console.log('body size', Number(event_size) - event_header_len)

    const version = buf.subarray(23, 25);
    file_pointer += 2;
    console.log('binlog version', unpack('<H', version));

    const server_version = buf.subarray(25, 75);
    file_pointer += 50;
    console.log('server version', unpack('<50s', server_version))

    const follow_header_timestamp = buf.subarray(75, 79);
    file_pointer += 4;
    console.log('timestamp', unpack('<I', follow_header_timestamp));

    const _ = buf.subarray(79, Number(event_size) - 19 - 56);
    file_pointer += Number(event_size) - 19 - 56
    console.log(file_pointer);

    const t = buf.subarray(465, 484);
    console.log(unpack('<IB3IH', t))
    const a = buf.subarray(484, 497);
    console.log(unpack('<IIBHH', a));
    const b = unpack('<IIBHH', a);
    console.log(b[0])
    console.log(buf.readUInt32LE(Number(b[0])))
}

const main = () => {
    const buf = fs.readFileSync('/opt/homebrew/var/mysql/mariadb-bin.000001');
    const magic = magicNumber(buf);
    console.log(magic)
    headerFunc(magic, buf)
}

if(require.main === module) {
    (() => {
        main();
    })()
};