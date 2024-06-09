lines = [line.strip() for line in open("temp.md", encoding='utf-8', errors='strict')]

import pyperclip

res = []
for line in lines:
	# 1 & 6 & 87837 & 787 \\ \hline
	
	cur = " & ".join(line.replace("&", "\\&").replace("$", "\\$").split("\t"))
	res.append(cur + " \\\\ \\hline")
pyperclip.copy("\n".join(res))