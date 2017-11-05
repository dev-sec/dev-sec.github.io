---
title: "Git Hook"
date:   2015-04-15 21:00:00
---

`prepare-commit-msg.hook`

```bash
#!/bin/sh
#       Auto sign all commits to allow them to be used by the Hardening Framework project.
#       see https://github.com/hardening-io/docs/blob/master/docs/how-to-contribute.md#sign-your-work
#
GH_USER=$(git config --get github.user)
SOB=$(git var GIT_AUTHOR_IDENT | sed -n "s/^\(.*>\).*$/HardeningFramework-DCO-1.1-Signed-off-by: \1 \(github: $GH_USER\)/p")
grep -qs "^$SOB" "$1" || {
	echo
	echo "$SOB"
} >> "$1"
```
