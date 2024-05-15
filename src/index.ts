import * as fs from 'fs';
import * as util from 'util';
import {unpack} from 'python-struct';

const event_header_len = 19;
let file_pointer = 0;

const magicNumber = (buf: Buffer) => {
    const magic = buf.subarray(0, 22);
    return magic
}



const headerFunc = (start_log_pos: number, buf: Buffer) => {
    const header_buf = buf.subarray(start_log_pos, start_log_pos + 19);

    const timestamp = header_buf.readUInt32LE(0);
    const event_type = header_buf.readUInt8(0);
    console.log(timestamp, event_type)

    // const u = unpack('<IB3IH', header_buf); // Little-Endian unsigned Int 4 Byte, unsigned char 1 Byte, unsigned Int 4 Byte, unsigned Int 4 Byte, unsigned Int 4 Byte, unsigned short 2 Byte
    // const timestamp = Number(u[0]) * 1000;
    // const event_type = u[1];
    // const server_id = u[2];
    // const event_size = u[3];
    // const next_log_pos = u[4];

    // console.log(`timestamp: ${timestamp}\nevent_type: ${event_type}\nserver_id: ${server_id}\nevent_size: ${event_size}\nnext_log_pos: ${log_pos}`)

    // console.log('body size', Number(event_size) - event_header_len)

    // const version = buf.subarray(23, 25);
    // console.log('binlog version', unpack('<H', version));

    // const server_version = buf.subarray(25, 75);
    // console.log('server version', unpack('<50s', server_version))

    // const follow_header_timestamp = buf.subarray(75, 79);
    // console.log('timestamp', unpack('<I', follow_header_timestamp));

    // const _ = buf.subarray(79, Number(event_size) - 19 - 56);
    // file_pointer += Number(event_size) - 19 - 56
    
    // return { timestamp, event_type, server_id, event_size, next_log_pos };
}

const main = () => {
    const buf = fs.readFileSync('/opt/homebrew/var/mysql/mariadb-bin.000001');
    const magic = magicNumber(buf);
    console.log(magic);
    headerFunc(4, buf)
}

if(require.main === module) {
    (() => {
        main()
        // const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x12]);

        // console.log(buf.readUInt32LE(0).toString());
    })()
};