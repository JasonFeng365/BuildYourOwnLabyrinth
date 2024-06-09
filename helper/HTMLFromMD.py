lines = [line.strip() for line in open("temp.md", encoding='utf-8', errors='strict')]

codePrefix = "<code>"
suffix = "</code>"

import pyperclip

def replaceCode(line):
	stars = []
	for i in range(len(line)):
		if line[i]=='`': stars.append(i)
	
	l = 0
	count = 0

	res = ""
	for i in stars:
		res += line[l:i]
		count+=1
		if count%2: res += codePrefix
		else: res += suffix
		l = i+1
	res += line[l:]
	return res

def replaceUnderscores(line):
	return line.replace("_", "\\_")
def replaceQuote(line):
	return line.replace("’", "'").replace('”', '"')

res = []
for line in lines:
	if line == "": continue
	if line[:3]=="###":
		line = line[4:]
		res.append("")
		res.append("<h3>"+line+"</h3>")
		continue
	
	line = replaceCode(line)
	line = replaceQuote(line)
	res.append("<p>"+line+"</p>")
pyperclip.copy("\n".join(res))