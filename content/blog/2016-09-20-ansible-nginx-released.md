---
title: "Ansible nginx-hardening role released"
date: 2016-09-20 19:00:00
authors:
- name: Sebastian Gumprich
  image: https://avatars0.githubusercontent.com/u/3198961?v=4
  link: https://www.zufallsheld.de
---

The next part of server hardening with Ansible is released today: The [ansible-nginx-hardening](https://github.com/dev-sec/ansible-nginx-hardening) role.

This role hardens your existing nginx installations (version 1.0.15 or later).

This time we tried to make sure that the hardening role works with popular nginx installation roles, so if you use any of the following (great!) roles to manage your nginx, you can use our hardening role:

* [geerlinggux.nginx](https://galaxy.ansible.com/ui/standalone/roles/geerlingguy/nginx/)
* [jdauphant.nginx](https://galaxy.ansible.com/ui/standalone/roles/jdauphant/nginx/)
* [franklinkim.nginx](https://galaxy.ansible.com/ui/standalone/roles/franklinkim/nginx/)

We also tried to provide good documentation on the various settings and think that it turned out very well, but [see](https://github.com/dev-sec/ansible-nginx-hardening#nginx-hardening-ansible-role) for yourself.

This role is now the fourth Ansible role, joining [ssh-hardening](https://github.com/dev-sec/ansible-ssh-hardening), [os-hardening](https://github.com/dev-sec/ansible-os-hardening) and [mysql-hardening](https://github.com/dev-sec/ansible-mysql-hardening).

Of course we not only maintain this role for Ansible, there exist implementations for [Chef](https://github.com/dev-sec/chef-nginx-hardening) and [Puppet](https://github.com/dev-sec/puppet-nginx-hardening) as well!

We're supporting this role on Debian- and Enterprise Linux-based operating systems, but we'll also try our best in helping you run the role on other systems! Just open up an issue or pull request or join our [Gitter Chatroom](https://gitter.im/dev-sec/general) to chat directly with us!

You can find the role on [Github](https://github.com/dev-sec/ansible-nginx-hardening/) and on [Ansible Galaxy](https://galaxy.ansible.com/ui/standalone/roles/dev-sec/nginx-hardening/).

Be sure to follow us on [Twitter](https://twitter.com/DevSecIO) for the latest updates.
