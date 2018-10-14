---
layout: post
title: "Ansible joins Hardening Framework"
date:   2015-04-30 18:00:00
authors:
- name: Christoph Hartmann
  image: https://avatars3.githubusercontent.com/u/1178413?v=4
  link: https://lollyrock.com
---

The [Hardening Framework](http://dev-sec.io/) provides best-practice security for DevOps by implementing server hardening with DevOps tools. We are happy to announce that with help of [Sebastian Gumprich](https://www.zufallsheld.de) we were able to implement our first [Ansible](http://www.ansible.com) role: [ansible-ssh-hardening](https://github.com/dev-sec/ansible-ssh-hardening/). Over the last weeks, we worked hard to release version 1.0:

 * Implement ssh hardening to meet our [tests](https://github.com/dev-sec/tests-ssh-hardening)
 * Setup test infrastructure with [kitchen-ansible](https://github.com/neillturner/kitchen-ansible)
 * Implement travis tests[#7](https://github.com/dev-sec/ansible-ssh-hardening/issues/7)
 * Add handlers to restart sshd only when necessary [#6](https://github.com/dev-sec/ansible-ssh-hardening/issues/6)
 * Add support for Oracle Linux [#2](https://github.com/dev-sec/ansible-ssh-hardening/issues/2)

The module is available via [Ansible Galaxy](https://galaxy.ansible.com/dev-sec/ssh-hardening/), now.

As a next step, we plan to add support more modules. `ansible-os-hardening` is already in the works. Stay tuned and follow us on [Twitter](https://twitter.com/hardening_io).
