/**
 GET 还是 POST？
 与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。
 然而，在以下情况中，请使用 POST 请求：
    无法使用缓存文件（更新服务器上的文件或数据库）
    向服务器发送大量数据（POST 没有数据量限制）
    发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
 从字面上看，get用于请求信息，post用于上传信息
 */