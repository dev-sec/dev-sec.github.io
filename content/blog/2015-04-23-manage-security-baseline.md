---
title: "Managing your Security Baseline"
date:   2015-04-23 21:00:00
authors:
- name: Christoph Hartmann
  image: https://avatars3.githubusercontent.com/u/1178413?v=4
  link: https://lollyrock.com
---

Despite many advancements in the field of security, two fundamental issues have stayed at the core of many attacks over the last 20 years. They preveil despite firewalls, SIEMs, or scanners. They are: Misconfiguration and unpatched software with known vulnerabilities.

Both problems have been addressed with processes and strong governance. While improving the situation considerably, failures are still unavoidable and often unmitigated. I have seen various companies with great risk and security management, that still suffer from severe configuration issues and unpatched machines. It is still challenging to identify non-intended changes to configuration, because there is no way to compare the desired configuration with actual settings. Fast-paced elastic cloud environments have further stressed the importance of up-to-date safety and configuration.

This is a place, where a new approach and new technology can be combined to solve an industry problem. By using configuration management tools, we are able to implement most security rules for technology via code. This has various advantages:

- Instead of static rules documents, we establish reusable tests (via [ServerSpec](http://serverspec.org/))
- Security configurations can be implemented
- The rules will be turned into source code
- Source code can evolve and managed in source code management systems

A great way that illustrates this approach is the implementation of the base operating system hardening as part of the [Hardening Framework](http://dev-sec.io/). Traditionally, these would be adapted to every operating system and release, which is time-consuming and error-prone even to the most experienced administrators. We automated a common set of rules in tools like Chef and Puppet:

- [https://github.com/dev-sec/chef-os-hardening](https://github.com/dev-sec/chef-os-hardening)
- [https://github.com/dev-sec/puppet-os-hardening](https://github.com/dev-sec/puppet-os-hardening)

This implements strict rules, which are verified in [ServerSpec](http://serverspec.org/):

- [https://github.com/dev-sec/tests-os-hardening](https://github.com/dev-sec/tests-os-hardening)

From now on, every admin is able to harden a server in no time. The security rules are well-established and can be used to verify if the configuration is done correctly. A video that illustrates our approach with a Nessus scanner:

<p style="text-align:center">
<iframe src="https://player.vimeo.com/video/106808139?color=ff0179" width="400" height="225" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</p>

By using the established modules in the [Hardening Framework](http://dev-sec.io/), your company is able to increase the security baseline quickly. Within the Hardening Framework Team, some of the best industry experts work together to build a solution that helps securing your servers. The project is managed as an independent open source project, to ensure an industry-wide ruleset. [Contributions](https://github.com/dev-sec) to any project are very welcome.

Follow us on [Twitter](https://twitter.com/hardening_io)
