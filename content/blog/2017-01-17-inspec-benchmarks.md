---
title: "We are happy to announce our new DevSec baselines"
date:   2017-01-17 09:00:00
authors:
- name: Christoph Hartmann
  image: https://avatars3.githubusercontent.com/u/1178413?v=4
  link: https://lollyrock.com
---

Happy New Year DevSec users,

from day one of the DevSec Hardening Framework project, we used the same test suites for our Ansible, Chef and Puppet implementations. Those test suites have been implemented in [Serverspec]() and helped us to enforce the same rules for all hardening implementations. The combination with [test-kitchen]() allowed us to easily test Ansible, Chef and Puppet implementations across the multiple operating systems with the same test suites.

The DevSec Hardening Framework grew and users requested additional documentation around our recommendations. We always used industry best-practices, but it would be even better to attach more information directly to our tests. [InSpec](http://inspec.io/) builds on the learnings of [Serverspec](https://blog.chef.io/2015/11/04/the-road-to-inspec/) and allowed us to add more meta-data to each test. A Serverspec test like:

```ruby
describe file('/etc/ssh/sshd_config') do
  its(:content) { should match(/^Protocol 2$/) }
end
```

could easily represented in InSpec as:

```ruby
control 'ssh-04' do
  impact 1.0
  title 'Client: Specify protocol version 2'
  desc "
    Only SSH protocol version 2 connections should be permitted. Version 1 of
    the protocol contains security vulnerabilities. Don't use legacy insecure
    SSHv1 connections anymore.
  "
  describe ssh_config do
    its('Protocol') { should eq('2') }
  end
end
```

With InSpec we are able to document and implement our security checks in one language. We used the opportunity to adapt all of our test suites to use InSpec. Now, users are able to run our tests standalone as well. Therefore we are going to call them `baseline` instead of `tests`. The following baselines are available now:

Operating System Baselines:

- [Linux Baseline](https://github.com/dev-sec/linux-baseline)
- [SSH Baseline](https://github.com/dev-sec/ssh-baseline)
- [Windows Baseline](https://github.com/dev-sec/windows-baseline)

Patch Baselines:

- [Linux Patch Baseline](https://github.com/dev-sec/linux-patch-benchmark)
- [Windows Patch Baseline](https://github.com/dev-sec/windows-patch-benchmark)

Application Baselines:

- [PostgreSQL Baseline](https://github.com/dev-sec/postgres-baseline)
- [MySQL Baseline](https://github.com/dev-sec/mysql-baseline)
- [Nginx Baseline](https://github.com/dev-sec/nginx-baseline)
- [Apache Baseline](https://github.com/dev-sec/apache-baseline)
- [PHP Baseline](https://github.com/dev-sec/mysql-baseline)


To use the DevSec Hardening Framework baselines just install [InSpec](). All our baselines are registered in Chef Supermarket:

```bash
# List all available profiles
$ inspec supermarket profiles

# Run Linux baseline
$ inspec exec supermarket://devsec/linux-baseline

# Run Windows baseline
$ inspec exec supermarket://devsec/windows-baseline
```

You can run the baselines directly from Github as well:

```bash
# Linux
inspec exec github.com/dev-sec/linux-baseline -t ssh://user:host -i /path/to/key

# Windows
inspec exec github.com/dev-sec/windows-baseline -t winrm://user:host --password secret
```

Since those baselines can be executed independently, you could verify the state of your servers immediately.

We are looking forward to get feedback.
