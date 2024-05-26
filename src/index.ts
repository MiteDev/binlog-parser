import * as fs from 'fs';
import MariaDB from './databases/mariadb/mariadb';
const event_header_len = 19;

const magicNumber = (buf: Buffer) => {
    const magic = buf.subarray(0, 22);
    return magic
}

const getEventPayloadBuf = (start_log_pos: number, next_log_pos: number, buf: Buffer) => 
    buf.subarray(start_log_pos, next_log_pos);

const getEventHeaderBuf = (start_log_pos: number, buf: Buffer) => 
    buf.subarray(start_log_pos, start_log_pos + event_header_len);



const main = () => {
    const buf = fs.readFileSync('C:\\Program Files\\MariaDB 10.9\\data\\mariadb-bin.000007');
    const m = new MariaDB(buf);
    
    const headers = m.headers;

    headers.map(header => {
        console.log(header)
        if(header.event_type === 160) {
           
            const e = m.annotateRowsEvent(header.payload_log_pos, header.next_log_pos);
            console.log(e);
        }
    })
}

if(require.main === module) {
    (() => {
        main()
        // const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x12]);

        // console.log(buf.readUInt32LE(0).toString());
    })();
};
