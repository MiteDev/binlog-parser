interface HeaderParserInterface {
    timestamp: number;
    event_type: number;
    server_id: number;
    event_size: number;
    payload_log_pos: number;
    next_log_pos: number;
    flag: number;
}

export {
    HeaderParserInterface
}