---
title: "New Ansible os-, ssh- and mysql-hardening releases"
date:   2017-04-23 13:00:00
author: 'Sebastian Gumprich'
---

Hey friends,

We released new versions of [ansible-os-hardening](https://github.com/dev-sec/ansible-os-hardening), [ansible-ssh-hardening](https://github.com/dev-sec/ansible-ssh-hardening) and [ansible-mysql-hardening](https://github.com/dev-sec/ansible-mysql-hardening)!

These releases are important to us in multiple ways:

As always, they provide new features and configuration possibilities for you to use! More on that below.

# Complete tests in TravisCI

Furthermore we now leverage the full possibilities of [TravisCI](https://travis-ci.org/dev-sec/) for the [os-hardening](https://travis-ci.org/dev-sec/ansible-ssh-hardening), [ssh-hardening](https://travis-ci.org/dev-sec/ansible-ssh-hardening) and [mysql-hardening](https://travis-ci.org/dev-sec/ansible-mysql-hardening)  roles. This means that all supported operating systems are now tested and verified online. For that we use customized [docker-images](https://github.com/rndmh3ro/docker-ansible) that have Ansible pre-installed, as well as our [InSpec-tests](https://github.com/dev-sec/?utf8=%E2%9C%93&q=baseline&type=&language=) to verify the roles!

However some operating systems are still missing for mysql-hardening because we're facing some issues that hopefully will be resolved soon!

We're always looking for help! Join us on [GitHub](https://github.com/dev-sec/) or [Gitter chatroom](https://gitter.im/dev-sec/general).


# Breaking Changes

One more important thing to note are the **breaking changes**.

## All roles

We removed support for Ansible 1.9 in all three roles, so we can leverage the new modules and functions of Ansible 2.0!

## ssh-hardening


- Change the ssh_client_ports list variable into a simple non-list variable named ssh_client_port.  [\#84](https://github.com/dev-sec/ansible-ssh-hardening/pull/84) ([fullyint](https://github.com/fullyint))
  - Before:
{% highlight jinja %}
{% raw %}
{% for port in ssh_client_ports -%}
Port {{port}}
{% endfor %}
 {% endraw %}
{% endhighlight %}
  - After:
{% highlight jinja %}
{% raw %}
Port {{ ssh_client_port }}
{% endraw %}
{% endhighlight %}

- Fix ssh config to handle custom options per Host [\#83](https://github.com/dev-sec/ansible-ssh-hardening/pull/83) ([fullyint](https://github.com/fullyint))
  - Before:
{% highlight jinja %}
{% raw %}
    # one or more hosts, to which ssh-client can connect to.
# Default is empty, but should be configured for security reasons!
    ssh_remote_hosts: []           # ssh
{% endraw %}
{% endhighlight %}

  - After:
{% highlight jinja %}
{% raw %}
# Hosts with custom options.            # ssh
# Example:
# ssh_remote_hosts:
#   - names: ['example.com', 'example2.com']
#     options: ['Port 2222', 'ForwardAgent yes']
#   - names: ['example3.com']
#     options: ['StrictHostKeyChecking no']
ssh_remote_hosts: []
{% endraw %}
{% endhighlight %}


## mysql-hardening


- Renamed variables in [\#22](https://github.com/dev-sec/ansible-mysql-hardening/pull/22) ([agno01](https://github.com/agno01)) and [\#26](https://github.com/dev-sec/ansible-mysql-hardening/pull/26)
  - renamed `mysql_hardening_mysql_conf` var to `mysql_hardening_mysql_conf_file`
  - introduced `mysql_hardening_mysql_conf_dir` variable
  - introduced `mysql_cnf_owner` as variable for owner of configuration files
  - set default value of `mysql_hardening_mysql_conf_dir` variable for RedHat, OracleLinux, Debian
  - changed default hardcoded full path in `mysql_hardening_hardening_conf` var to be based on `mysql_hardening_mysql_conf_dir` var

# Improvements

Of course we were productive in fixing bugs, improving the code and adding more features. All with the help of [our](https://github.com/dev-sec/ansible-os-hardening/graphs/contributors) [awesome](https://github.com/dev-sec/ansible-ssh-hardening/graphs/contributors) [contributors](https://github.com/dev-sec/ansible-mysql-hardening/graphs/contributors)!

## os-hardening

- Install initramfs-tools [\#114](https://github.com/dev-sec/ansible-os-hardening/pull/114) ([rndmh3ro](https://github.com/rndmh3ro))
- Omit empty variables [\#106](https://github.com/dev-sec/ansible-os-hardening/pull/106) ([rndmh3ro](https://github.com/rndmh3ro))

Full [Changelog](https://github.com/dev-sec/ansible-os-hardening/releases/tag/4.0.0)

## ssh-hardening
- Use different Hostkeys according to installed ssh version [\#99](https://github.com/dev-sec/ansible-ssh-hardening/pull/99) ([rndmh3ro](https://github.com/rndmh3ro))
- Remove small dh primes [\#97](https://github.com/dev-sec/ansible-ssh-hardening/pull/97) ([rndmh3ro](https://github.com/rndmh3ro))
- Add Ed25519 SSH host key to match ssh-baseline [\#96](https://github.com/dev-sec/ansible-ssh-hardening/pull/96) ([techraf](https://github.com/techraf))
- Add support for FreeBSD OpenSSH server and client [\#95](https://github.com/dev-sec/ansible-ssh-hardening/pull/95) ([jbenden](https://github.com/jbenden))
- Defaults: Remove DSA from SSH host keys to match ssh-baseline profile [\#92](https://github.com/dev-sec/ansible-ssh-hardening/pull/92) ([techraf](https://github.com/techraf))
- Make ChallengeResponseAuthentication configurable [\#85](https://github.com/dev-sec/ansible-ssh-hardening/pull/85) ([rndmh3ro](https://github.com/rndmh3ro))

Full [Changelog](https://github.com/dev-sec/ansible-ssh-hardening/releases/tag/4.0.0)

## mysql-hardening

- Add CentOS7 with MariaDB support [\#27](https://github.com/dev-sec/ansible-mysql-hardening/pull/27) ([chrispoupart](https://github.com/chrispoupart))
- Add follow=yes to my.cnf protect task, in case its a symlink. [\#21](https://github.com/dev-sec/ansible-mysql-hardening/pull/21) ([rndmh3ro](https://github.com/rndmh3ro))

Full [Changelog](https://github.com/dev-sec/ansible-mysql-hardening/releases/tag/2.0.0)


You can follow us on [Twitter](https://twitter.com/DevSecIO).

Thanks and have a nice and secure day!

Sebastian
