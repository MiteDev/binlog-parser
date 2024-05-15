# CDC
개인 프로젝트

### Supported Database
---
* MariaDB
* Mysql
* Postgresql

## Query Event
### MariaDB
---
|  <center>Hex</center> |  <center>Decimal</center> |  <center>Event type</center> |
|:--------|:--------:|--------:|
| <center> 0x02 </center> | <center> 2 </center> | <center> QUERY_EVENT </center> |
| <center> 0x03 </center> | <center> 3 </center> | <center> STOP_EVENT </center> |
| <center> 0x04 </center> | <center> 4 </center> | <center> ROTATE_EVENT </center> |
| <center> 0x10 </center> | <center> 16 </center> | <center> XID_EVENT </center> |
| <center> 0x0d </center> | <center> 13 </center> | <center> RAND_EVENT </center> |
| <center> 0x0e </center> | <center> 14 </center> | <center> USER_VAR_EVENT </center> |
| <center> 0x0f </center> | <center> 15 </center> | <center> FORMAT_DESCRIPTION_EVENT </center> |
| <center> 0x13 </center> | <center> 19 </center> | <center> TABLE_MAP_EVENT </center> |
| <center> 0x1b </center> | <center> 27 </center> | <center> HEARTBEAT_LOG_EVENT </center> |
| <center> 0xa0 </center> | <center> 160 </center> | <center> ANNOTATE_ROWS_EVENT </center> |
| <center> 0xa1 </center> | <center> 161 </center> | <center> BINLOG_CHECKPOINT_EVENT </center> |
| <center> 0xa2 </center> | <center> 162 </center> | <center> GTID_EVENT </center> |
| <center> 0xa3 </center> | <center> 163 </center> | <center> GTID_LIST_EVENT </center> |
| <center> 0xa4 </center> | <center> 164 </center> | <center> START_ENCRYPTION_EVENT </center> |
| <center> 0xa5 </center> | <center> 165 </center> | <center> QUERY_COMPRESSED_EVENT </center> |
| <center> 0xa6 </center> | <center> 166 </center> | <center> WRITE_ROWS_COMPRESSED_V1 </center> |
| <center> 0xa7 </center> | <center> 167 </center> | <center> UPDATE_ROWS_COMPRESSED_V1 </center> |
| <center> 0xa8 </center> | <center> 168 </center> | <center> DELETE_ROWS_COMPRESSED_V1 </center> |
| <center> 0xa9 </center> | <center> 169 </center> | <center> WRITE_ROWS_V1 </center> |
| <center> 0xaa </center> | <center> 170 </center> | <center> UPDATE_ROWS_V1 </center> |
| <center> 0xab </center> | <center> 171 </center> | <center> DELETE_ROWS_V1 </center> |