from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

def send_results(results):
  MSG = MIMEMultipart()
  password     = "pzpisvwkusurpkcs"
  MSG['From']    = "correopruebaclasesud@gmail.com"
  MSG['To']      = "kevinskate.kg@gmail.com"
  MSG['Subject'] = "Battleship results"
  MSG.attach(MIMEText (results, 'plain'))
  try:
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login(MSG['From'], password)

    server.sendmail(MSG['From'], MSG['To'], MSG.as_string())
    server.quit()
    print ("Message sent to: %s" % (MSG['To']))
  except:
    print("Error al enviar el correo")