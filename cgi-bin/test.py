#!/usr/bin/python
#-------------------------------------------------------------------------#
import cgi, cgitb, os, sys, heapq, random, uuid, surveyWebEnvironment #---#
cgitb.enable(); form = cgi.FieldStorage() #-------------------------------#
#-------------------------------------------------------------------------#

message = "test"   
surveyWebEnvironment.printHTMLmsg(message)
