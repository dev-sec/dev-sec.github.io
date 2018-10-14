---
title: "chef-windows-hardening 0.9.0 is released"
date:   2017-05-15 09:00:00
authors:
- name: Yvo van Doorn
  image: https://avatars0.githubusercontent.com/u/2694655?v=4
  link: https://github.com/yvovandoorn
---

DevSec Hardening Framework project is releasing a new minor release [chef-windows-hardening](https://github.com/dev-sec/chef-windows-hardening/releases/tag/v0.9.0) today.

The release introduces the, always, disabling of SMB1 protocol on Windows operating systems.

*Note: This resource was introduced in the wake of the WannaCrypt/WannaCry ransomware worm which exploits a [known vulnerability in the SMBv1 protocol](https://technet.microsoft.com/en-us/library/security/ms17-010.aspx)*

**Highlights and breaking changes:**

- Enforce the disabling of SMBv1 on all versions of Windows, regardless of installation or whether the feature is enabled (e.g. Windows 2016)

**New attributes:**
- `['windows_hardening']['smbv1']['disable']` allows the disabling/enabling of the enforcement of disabling SMBv1

We are looking forward to get your feedback via [GitHub issues](https://github.com/dev-sec/chef-windows-hardening/issues) or [Gitter chatroom](https://gitter.im/dev-sec/general). And you can follow us on [Twitter](https://twitter.com/DevSecIO).
