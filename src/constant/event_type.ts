import { oneByteNumToBuf } from "../util/buf";

const EVENT_TYPE = {
    QUERY_EVENT: {
        hex: oneByteNumToBuf(2),
        dec: 2
    },
    STOP_EVENT: {
        hex: oneByteNumToBuf(3),
        dec: 3
    },
    ROTATE_EVENT: {
        hex: oneByteNumToBuf(4),
        dec: 4
    },
    RAND_EVENT: {
        hex: oneByteNumToBuf(13),
        dec: 13
    },
    USER_VAR_EVENT: {
        hex: oneByteNumToBuf(14),
        dec: 14
    },
    FORMAT_DESCRIPTON_EVENT: {
        hex: oneByteNumToBuf(15),
        dec: 15
    },
    XID_EVENT: {
        hex: oneByteNumToBuf(16),
        dec: 16
    },
    TABLE_MAP_EVENT: {
        hex: oneByteNumToBuf(19),
        dec: 19
    },
    HEARTBEAT_LOG_EVENT: {
        hex: oneByteNumToBuf(27),
        dec: 27
    },
    ANNOTATE_ROWS_EVENT: {
        hex: oneByteNumToBuf(160),
        dec: 160
    },
    BINLOG_CHECKPOINT_EVENT: {
        hex: oneByteNumToBuf(161),
        dec: 161
    },
    GTID_EVENT: {
        hex: oneByteNumToBuf(162),
        dec: 162
    },
    GTID_LIST_EVENT: {
        hex: oneByteNumToBuf(163),
        dec: 163
    },
    START_ENCRIPTION_EVENT: {
        hex: oneByteNumToBuf(164),
        dec: 164
    },
    QUERY_COMPRESSED_EVENT: {
        hex: oneByteNumToBuf(165),
        dec: 165
    },
    WRITE_ROWS_COMPRESSED_V1: {
        hex: oneByteNumToBuf(166),
        dec: 166
    },
    UPDATE_ROWS_COMPRESSED_V1: {
        hex: oneByteNumToBuf(167),
        dec: 167
    },
    DELETE_ROWS_COMPRESSED_V1: {
        hex: oneByteNumToBuf(168),
        dec: 168
    },
    WRITE_ROWS_V1: {
        hex: oneByteNumToBuf(169),
        dec: 169
    },
    UPDATE_ROWS_V1: {
        hex: oneByteNumToBuf(170),
        dec: 170
    },
    DELETE_ROWS_V1: {
        hex: oneByteNumToBuf(171),
        dec: 171
    }
}

export {
    EVENT_TYPE
}

if(require.main === module) {
    (() => {
        console.log(EVENT_TYPE)
    })()
}