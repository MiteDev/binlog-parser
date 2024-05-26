import { EVENT_HEADER_LENGTH, CHECK_SUM } from '../../constant';

export default class MariaDB {
    private buf_len: number;
    private buf: Buffer;

    constructor(buf: Buffer) {
        this.buf_len = buf.length;
        this.buf = buf;
    }

    queryEvent(payload_log_pos: number, next_log_pos: number) {
        const buf = this.buf.subarray(payload_log_pos, next_log_pos - CHECK_SUM);
        
        // =========== Fixed Data Part ===========
        const thread_id = buf.readUInt32LE(0); // 4 Byte
        const execution_time = buf.readUInt32LE(4); // 4 Byte
        const statement_default_database_name_len = buf.readUInt8(8); // 1 Byte
        const error_code = buf.readUInt16LE(9); // 2 Byte
        const status_variable_block_len = buf.readUInt16LE(11); // 2 Byte => Total 13 Byte Read

        // =========== Variable Data Part ===========
        const variable_buf_pos = 13;
        const status_variables = buf.subarray(variable_buf_pos, status_variable_block_len); 
        const default_database = buf.subarray(variable_buf_pos + status_variable_block_len, variable_buf_pos + status_variable_block_len + statement_default_database_name_len).toString();
        const the_sql_statement = buf.subarray(13 + status_variable_block_len + statement_default_database_name_len, buf.length).toString();
        console.log(the_sql_statement)
        
        return {
            thread_id,
            execution_time,
            statement_default_database_name_len,
            error_code,
            status_variable_block_len,
            status_variables,
            default_database,
            the_sql_statement
        }
    }

    annotateRowsEvent(payload_log_pos: number, next_log_pos: number) {
        // Delete 4 Byte for CheckSum
        const field = this.buf.subarray(payload_log_pos, next_log_pos - CHECK_SUM).toString(); 
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

    headerBufParser(buf: Buffer) {
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

    headerParser(header: ReturnType<typeof this.headerBufParser>) {

    }

    getAllHeader() {
        const headers = [];
        
        for(let start_log_pos = 4; start_log_pos < this.buf_len;) {
            const buf = this.buf.subarray(start_log_pos);
            const header = this.headerBufParser(buf);
            start_log_pos += header.event_size;
            headers.push(header);
        }

        return headers;
    }
}