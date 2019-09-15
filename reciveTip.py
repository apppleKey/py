import poplib
import re
import tkinter
class Window:
  def __init__(self,root):
    label1 = tkinter.Label(root,text='POP3')
    label2 = tkinter.Label(root,text='Port')
    label3 = tkinter.Label(root,text='用户名')
    label4 = tkinter.Label(root,text='密码')
    label1.place(x=5,y=5)
    label2.place(x=5,y=30)
    label3.place(x=5,y=55)
    label4.place(x=5,y=80)
    self.entryPop = tkinter.Entry(root)
    self.entryPort = tkinter.Entry(root)
    self.entryUser = tkinter.Entry(root)
    self.entryPass = tkinter.Entry(root,show="*")
    self.entryPop.insert(tkinter.END,'pop.163.com')
    self.entryUser.insert(tkinter.END,'wenzer@163.com')
    self.entryPass.insert(tkinter.END,'wdz33344521')
    self.entryPort.insert(tkinter.END,'110')
    self.entryPop.place(x=50,y=5)
    self.entryPort.place(x=50,y=30)
    self.entryUser.place(x=50,y=55)
    self.entryPass.place(x=50,y=80)
    self.get = tkinter.Button(root,text='收取邮件',command = self.Get)
    self.get.place(x=60,y=120)
    self.text=tkinter.Text(root)
    self.text.place(y=150)
    self.Get()
  def Get(self):
    try:
      host = self.entryPop.get()
      port =int(self.entryPort.get())
      user = self.entryUser.get()
      pw = self.entryPass.get()
      pop=poplib.POP3(host)
      pop.user(user)
      pop.pass_(pw)
      stat=pop.stat()
      self.text.insert(tkinter.END,'Staus:%d message(s),%d bytes\n' % stat)
      rx_headers = re.compile(r"^(From|To|Subject)")
      for n in range(stat[0]):
        response,lines,bytes = pop.top(n+1,10)
        self.text.insert(tkinter.END,"Message %d (%d bytes)\n" % (n+1,bytes))
        self.text.insert(tkinter.END,"-"*30+'\n')
        str_lines=[]
        for l in lines:
          str_lines.append(l.decode(encoding = 'utf-8'))
        self.text.insert(tkinter.END,"\n".join(filter(rx_headers.match,str_lines)))
        self.text.insert(tkinter.END,'\n')
        self.text.insert(tkinter.END,"-"*30+'\n')
    except Exception as e:
        print(e.encode("latin1").decode("gbk") )
        self.text.insert(tkinter.END,'接收错误\n')
root =tkinter.Tk()
window=Window(root)
root.mainloop()