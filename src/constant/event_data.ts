const EVENT_HEADER_LENGTH = 19;

const FORMAT_DESCRIPTOIN_EVENT_PAYLOAD = {
    binlog_version: {
        type: 'number',
        length: 2
    },
    mysql_server_version: {
        type: 'string',
        length: 50
    },
    create_timestamp: {
        type: 'number',
        length: 4
    }
}

const BINLOG_CHECKPOINT_EVENT_PAYLOAD = {
    log_filename_length: {
        type: 'number',
        length: 4
    },
    filename: {
        type: 'string',
        length: Infinity
    }
}

export {
    EVENT_HEADER_LENGTH, BINLOG_CHECKPOINT_EVENT_PAYLOAD, FORMAT_DESCRIPTOIN_EVENT_PAYLOAD
}