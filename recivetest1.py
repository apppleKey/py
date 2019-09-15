

import poplib ,random
from email.parser import Parser
from email.header import decode_header
from email.utils import parseaddr

"""POP的服务器信息"""
popHost = "pop.163.com"
userAdr = "wenzer@163.com"
userPwd = "wdz123456"

""" 创建POP3对象，添加用户名和密码"""
pop3Server = poplib.POP3(popHost)
pop3Server.user(userAdr)
pop3Server.pass_(userPwd)

def dealmeail(msg):
    # print(messageObject)

    # 解码-----------------
    msgDate = messageObject["date"]
    print('日期：'+msgDate)

    def decodeMsgHeader(header):
        """
        解码头文件
        :param header: 需解码的内容
        :return:
        """
        value, charset = decode_header(header)[0]
        if charset:
            value = value.decode(charset)
        return value


    senderContent = messageObject["From"]
    # parseaddr()函数返回的是一个元组(realname, emailAddress)
    senderRealName, senderAdr = parseaddr(senderContent) 
    # 将加密的名称进行解码 
    senderRealName = decodeMsgHeader(senderRealName)   
    print('发送人：'+senderRealName)
    print('发送地址：'+senderAdr)


    msgHeader = messageObject["Subject"]
    # 对头文件进行解码
    msgHeader = decodeMsgHeader(msgHeader )
    print('邮件主题：'+msgHeader)

"""获取邮件数量和占用空间"""
messageCount, mailboxSize = pop3Server.stat()

"""获取邮件请求返回状态码、每封邮件的字节大小(b'第几封邮件 此邮件字节大小')、"""
response, msgNumOctets, octets = pop3Server.list()

""" 获取任意一封邮件的邮件对象【第一封邮件的编号为1，而不是0】"""
msgIndex = random.randint(1,messageCount)
for i in range(1,messageCount):
    print('-----------------第{}封邮件------------'.format(i))
    # 获取第msgIndex封邮件的信息

    # msgLines中为该邮件的每行数据,先将内容连接成字符串，再转化为email.message.Message对象
    response, msgLines, octets = pop3Server.retr(i)
    msgLinesToStr = b"\r\n".join(msgLines).decode("utf8", "ignore")
    messageObject = Parser().parsestr(msgLinesToStr)
    dealmeail(messageObject)



""" 终止POP3服务"""
pop3Server.quit()