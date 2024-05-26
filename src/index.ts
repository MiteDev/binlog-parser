import * as fs from 'fs';
import MariaDB from './databases/mariadb/mariadb';

const main = () => {
    const buf = fs.readFileSync('C:\\Program Files\\MariaDB 10.9\\data\\mariadb-bin.000010');
    const m = new MariaDB(buf);
    
    const headers = m.getAllHeader();

    const t = m.queryEvent(1995, 2080);
    console.log(t);
    // headers.map(header => {
    //     console.log(header)
    //     if(header.event_type === 160) {
           
    //         const e = m.annotateRowsEvent(header.payload_log_pos, header.next_log_pos);
    //         console.log(e);
    //     }
    // })
}

if(require.main === module) {
    (() => {
        main();
    })();
};
