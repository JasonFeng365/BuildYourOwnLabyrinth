lines = [line.strip() for line in open("temp.md", encoding='utf-8')]

boldPrefix = "<b>"
codePrefix = "<b>"
suffix = "</b>"


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

def replaceUnderscores(line):
	return line.replace("_", "\\_")

for line in lines:
	if line == "": continue
	if line[:3]=="###":
		line = line[4:]
		print()
		print("<h3>"+line+"</h3>")
		continue
	line = replaceBold(line)
	line = replaceCode(line)
	print("<p>"+line+"</p>")