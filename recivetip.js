var options = {
    host: 'pop.163.com',
    port: 995,
    user: 'XXXXXXXXXXX@qq.com',
    pass: 'XXXXXXXXXX'
    }
    var Socket = tls.connect(options.port, options.host, cb_connected);
    //注册事件-连接回调
    Socket.on('connect', cb_connecting);
    //注册事件-服务器返回数据处理
    Socket.on('data', cb_Server_DataBack);