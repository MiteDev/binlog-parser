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

    const header = buf.subarray(4); // after 4byte
    console.log(header)

    file_pointer += event_header_len;

    const u = unpack('<IB3IH', header); // Little-Endian unsigned Int, unsigned char, unsigned Int, unsigned Int, unsigned Int, unsigned short
    const timestamp = Number(u[0]) * 1000;
    const event_type = u[1];
    const server_id = u[2];
    const event_size = u[3];
    const log_pos = u[4];

    console.log(`timestamp: ${timestamp}\nevent_type: ${event_type}\nserver_id: ${server_id}\nevent_size: ${event_size}\nnext_log_pos: ${log_pos}`)

    const version = buf.subarray(23, 24);
    console.log(version);
    file_pointer += 2;
    console.log('binlog version', unpack('<I', version));
}

const main = () => {
    const buf = fs.readFileSync('/home/dong/mysql-bin.000001');
    const magic = magicNumber(buf);
    console.log(magic)
    headerFunc(magic, buf)
}

if(require.main === module) {
    (() => {
        main();
    })()
};