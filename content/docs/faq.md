---
title: "Frequently asked questions"
date:   2015-04-15 21:00:00
---

# Frequently asked questions

### Is it possible to use the toolkit without internet connection

Yes, it is possible to use the hardening scripts on computers without internet connection. You need to ensure two specific things:

 * Configured package repository access (eg. RedHat Satellite)
 * Manual installation of chef or puppet

To run the scripts via chef without internet and chef server, do the following.

1. Download the chef package for your operating system.

```bash
wget https://opscode-omnibus-packages.s3.amazonaws.com/ubuntu/13.04/x86_64/chef_11.12.8-2_amd64.deb
```

Transfer the the package and the cookbooks on your servers and start the run:

```bash
echo "---> Install Chef"
dpkg -i chef_11.12.8-2_amd64.deb

echo "---> Start chef run in local mode"
# runs chef client in local mode
chef-client -z -o yourcookbook
```

More information about about chef in local mode is available at [getchef.com](http://www.getchef.com/blog/2013/10/31/chef-client-z-from-zero-to-chef-in-8-5-seconds/)

### How do I configure LDAP authentication with ssh-hardening

Configure the `ssh-cookbook` with `use-pam: true`. This enables the PAM authentication via ssh. In addition you need to configure [PAM properly to work with LDAP](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/ch-Directory_Servers.html#s2-ldap-pam). The configuration of PAM for LDAP is not covered by `os-hardening` or `ssh-hardening`.
