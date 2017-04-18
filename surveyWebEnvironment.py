#webSurveyEnvironment.py
import os 

def printHTMLmsg(message):
  print """\
Content-Type: text/html\n
<html>
<body>
<p>%s</p>
</body>
</html>
""" % message
  pass;
