#!/usr/bin/python
import cgi, cgitb, surveyWebEnvironment
cgitb.enable(); form = cgi.FieldStorage()
message = "hello world"   
surveyWebEnvironment.printHTMLmsg(message)
