import { EVENT_HEADER_LENGTH } from '../../constant';
import { HeaderParserInterface } from './interface';

export default class MariaDB {
    private buf_len: number;
    headers: HeaderParserInterface[];
    private buf: Buffer;

    magic: number;

    constructor(buf: Buffer) {
        this.buf_len = buf.length;
        this.headers = [];
        this.buf = buf;
        this.magic = 4;
        this.getAllHeader(buf);
    }

    annotateRowsEvent(payload_log_pos: number, next_log_pos: number) {
        const field = this.buf.subarray(payload_log_pos, next_log_pos).toString();
        console.log(field)
        return field;
    }

    descriptionEvent(buf: Buffer) {
        const binlog_version = buf.readUInt16LE(0);
        const mysql_server_version = buf.subarray(2, 52).toString().replace(/\x00/g, '');
        const create_timestamp = buf.readUInt32LE(52);

        return { binlog_version, mysql_server_version, create_timestamp };
    }

    binlogCheckpointEvent(buf: Buffer) {
        const log_filename_length = buf.readUint32LE(0);
        const filename = buf.subarray(4, 4 + log_filename_length);
        return { log_filename_length, filename };
    }

    headerParser(buf: Buffer) {
        const timestamp = buf.readUInt32LE(0);
        const event_type = buf.readUInt8(4);
        const server_id = buf.readUInt32LE(5);
        const event_size = buf.readUInt32LE(9);
        const next_log_pos = buf.readUInt32LE(13);
        const payload_log_pos = next_log_pos - event_size + EVENT_HEADER_LENGTH;
        const flag = buf.readUInt16LE(17);

        return {
            timestamp,
            event_type,
            server_id,
            event_size,
            payload_log_pos,
            next_log_pos,
            flag
        }
    }

    getAllHeader(buf = this.buf) {
        const delete_magic = buf.subarray(4);
        const header = this.headerParser(delete_magic);
        this.headers.push(header);

        while(header.next_log_pos >= this.buf_len) {
            return this.headers;
        }

        const next_buf = buf.subarray(header.event_size);
        this.getAllHeader(next_buf);
    }
}