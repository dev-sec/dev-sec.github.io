---
title: "Puppet overview"
date:   2015-04-15 21:00:00
---

The following modules are part of the hardening framework:

Base Operating System

* [puppet-os-hardening](https://github.com/hardening-io/puppet-os-hardening)
* [puppet-ssh-hardening](https://github.com/hardening-io/puppet-ssh-hardening)

Database

* [puppet-mysql-hardening](https://github.com/hardening-io/puppet-mysql-hardening)
* [puppet-postgres-hardening](https://github.com/hardening-io/puppet-postgres-hardening)

Web Server

* [puppet-nginx-hardening](https://github.com/hardening-io/puppet-nginx-hardening)
* [puppet-apache-hardening](https://github.com/hardening-io/puppet-apache-hardening)

Example

* [example-puppet-hardening](https://github.com/hardening-io/example-puppet-hardening)

## Publishing Puppet Modules

Simple enough: If you have your `Modulefile` and `metadata.json` ready, just run:

    cd puppet-xxx-hardening/
    puppet module build .

Results are in pkg.

The two files may not get merged correctly, so please diff:

    colordiff metadata.json pkg/puppet-*-hardening/metadata.json
