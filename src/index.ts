import * as fs from 'fs';
import * as util from 'util';
import {unpack} from 'python-struct';

const event_header_len = 19;

const magicNumber = (buf: Buffer) => {
    const magic = buf.subarray(0, 22);
    return magic
}

const descriptionEventParser = (buf: Buffer) => {
    const binlog_version = buf.readUInt16LE(0);
    const mysql_server_version = buf.subarray(2, 52).toString().replace(/\x00/g, '');
    const create_timestamp = buf.readUInt32LE(52);

    return { binlog_version, mysql_server_version, create_timestamp}
}

const binlogCheckpointEventParser = (buf: Buffer) => {
    const log_filename_length = buf.readUint32LE(0);
    console.log(log_filename_length);
    const filename = buf.subarray(4, 4 + log_filename_length);
    console.log(filename)
}

const getEventPayloadBuf = (start_log_pos: number, next_log_pos: number, buf: Buffer) => 
    buf.subarray(start_log_pos, next_log_pos);

const getEventHeaderBuf = (start_log_pos: number, buf: Buffer) => 
    buf.subarray(start_log_pos, start_log_pos + event_header_len);

const headerParser = (header_buf: Buffer) => {
    const timestamp = header_buf.readUInt32LE(0);
    const event_type = header_buf.readUInt8(4);
    const server_id = header_buf.readUInt32LE(5);
    const event_size = header_buf.readUInt32LE(9);
    const next_log_pos = header_buf.readUInt32LE(13);
    const start_playload_log_pos = next_log_pos - event_size + event_header_len;
    const flag = header_buf.readUInt16LE(17);

    return {
        timestamp,
        event_type,
        server_id,
        event_size,
        start_playload_log_pos,
        next_log_pos,
        flag
    }
}

const main = () => {
    const buf = fs.readFileSync('/opt/homebrew/var/mysql/mariadb-bin.000001');
    const magic = magicNumber(buf);
    const header_buf = getEventHeaderBuf(285, buf);
    const header = headerParser(header_buf);
    const payload_buf = getEventPayloadBuf(header.start_playload_log_pos, header.next_log_pos, buf);
    console.log(payload_buf)
    console.log(header);
    binlogCheckpointEventParser(payload_buf)
    // const description = descriptionEventParser(payload_buf);
    // console.log(description)

}

if(require.main === module) {
    (() => {
        main()
        // const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x12]);

        // console.log(buf.readUInt32LE(0).toString());
    })()
};