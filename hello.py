#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''20170619 
this file for testing if python/CGI is enabled'''

# enable debugging
import cgitb
cgitb.enable()

# hello world message (HTML)
print 'Content-Type: text/html;charset=utf-8\n'
print '<html><h1>h3ll0 w0r1d</h1></html>'
