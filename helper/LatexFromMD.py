lines = [line.strip() for line in open("temp.md", encoding='utf-8', errors='strict')]

boldPrefix = "\\bf{"
codePrefix = "\\texttt{"
suffix = "}"

import pyperclip

def replaceBold(line):
	stars = []
	for i in range(len(line)-1):
		if line[i]==line[i+1]=='*': stars.append(i)
	
	l = 0
	count = 0

	res = ""
	for i in stars:
		res += line[l:i]
		count+=1
		if count%2: res += boldPrefix
		else: res += suffix
		l = i+2
	res += line[l:]
	return res

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

def replaceFormatting(line):
	line = line.replace("_", "\\_")
	line = line.replace("&", "\\&")
	line = line.replace("’", "'").replace('”', '"')
	return line

res = []
for line in lines:
	if len(line) == 0:
		res.append("\\\\")
		continue
	if line[:3]=="###":
		line = line[4:]
		res.append("")
		res.append("\\subsection{"+line+"}")
		continue
	line = replaceFormatting(line)
	line = replaceBold(line)
	line = replaceCode(line)
	
	
	res.append("\\tab "+line+"\\\\")
pyperclip.copy("\n".join(res))