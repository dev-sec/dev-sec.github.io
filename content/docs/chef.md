---
title: "Chef overview"
date:   2015-04-15 21:00:00
---

# Chef overview

The following modules are part of the hardening framework:

Base Operating System

* [chef-os-hardening](https://github.com/hardening-io/chef-os-hardening)
* [chef-ssh-hardening](https://github.com/hardening-io/chef-ssh-hardening)

Database

* [chef-mysql-hardening](https://github.com/hardening-io/chef-mysql-hardening)
* [chef-postgres-hardening](https://github.com/hardening-io/chef-postgres-hardening)

Web Server

* [chef-nginx-hardening](https://github.com/hardening-io/chef-nginx-hardening)
* [chef-apache-hardening](https://github.com/hardening-io/chef-apache-hardening)

Example

* [example-chef-hardening](https://github.com/hardening-io/example-chef-hardening)


## Publishing Cookbooks

### Stove-route

The easy way:

        gem install stove
        stove login --username YOURNAME --key ~/.chef/YOURKEY.pem
        cd chef-os-hardening
        stove

In case of errors: Use the method below to ensure that your `metadata.rb` is configure correctly. If you cannot generate a `metadata.json`, fix this error first.

### Chef-route

We will use `chef-ssh-hardening` as an example project.

1. Install chef

        gem install chef

2. Since development happens locally, define your ssh key in your chef config

        ~/.chef/knife.rb

        client_key "#{ENV['HOME']}/.ssh/id_rsa"
        cookbook_license "apachev2"
        cookbook_copyright "<YOURNAME>"
        cookbook_email "<EMAIL>"

3. Copy to temporary cookbooks location

        mkdir /tmp/cookbooks
        cp -r . /tmp/cookbooks/ssh-hardening

4. Generate `metadata.json`

        knife cookbook metadata ssh-hardening -o /tmp/cookbooks

5. Generate tarball

        knife cookbook site share ssh-hardening "ssh-hardening" -o /tmp/cookbooks
