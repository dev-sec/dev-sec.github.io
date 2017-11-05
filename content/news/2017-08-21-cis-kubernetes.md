---
title: "CIS Kubernetes and CIS Independent Linux Benchmark"
date:   2017-05-15 09:00:00
aliases: [/blog/article/cis-kubernetes/]
---

The mission of DevSec Hardening Framework is to provide users with the best content to stay secure across their infrastructure fleet. We started by providing hardening solutions written in Chef cookbooks, Puppet modules as well as Ansible modules. Beginning of this year, we started to transform our testing suite into [standalone InSpec baselines](http://dev-sec.io/blog/article/inspec-benchmarks). Since then we added more and more baselines like [Nginx](https://github.com/dev-sec/nginx-baseline), [TLS/SSL](https://github.com/dev-sec/ssl-baseline), [OpenStack](https://github.com/dev-sec/openstack-baseline), [MySQL](https://github.com/dev-sec/mysql-baseline) or [PostgreSQL](https://github.com/dev-sec/postgres-baseline).

We are happy to announce that we got a major contribution by [Kristian Vlaardingerbroek](https://github.com/rarenerd) from [Schuberg Philis](schubergphilis.com). He wrote two new benchmarks and contributed those to our open source project:

 * [CIS Kubernetes Benchmark](https://github.com/dev-sec/cis-kubernetes-benchmark)
 * [CIS Distribution Independent Linux Benchmark](https://github.com/dev-sec/cis-dil-benchmark)

We like to thank Kristian and Schuberg Philis for their amazing work and their efforts to make security more accessible to our DevSec community.

## Kubernetes

{: .center}
![Kubernetes]({{ site.baseurl }}/assets/images/kube.png)

Kubernetes is one of the leading container orchestration platforms from Google and part of [CNCF](https://www.cncf.io/). While our existing [CIS Docker Benchmark](https://github.com/dev-sec/cis-docker-benchmark) verifies a single-node deployment, the Kubernetes profile is going to verify the container orchestration platform. Now, DevSec users have the ability to secure their containers in production. The benchmarks use [InSpec](https://www.inspec.io/) which allows you to adapt and extend the profile to your needs via [profile inheritance](https://www.inspec.io/docs/reference/profiles/). A sample test in InSpec looks like:

```
control 'cis-kubernetes-benchmark-1.1.4' do
  title 'Ensure that the --insecure-allow-any-token argument is not set'
  desc "
     Do not allow any insecure tokens
     Rationale: Accepting insecure tokens would allow any token without
     actually authenticating anything. User information is parsed from
     the token and connections are allowed.
  "
  impact 1.0

  tag cis: 'kubernetes:1.1.4'
  tag level: 1

  describe processes('kube-apiserver').commands.to_s do
    it { should_not match(/--insecure-allow-any-token/) }
  end
end
```

Please go ahead, try [CIS Kubernetes Benchmark](https://github.com/dev-sec/cis-kubernetes-benchmark). As all other DevSec baselines, this profile is also registered to the InSpec Supermarket. Therefore you can easily use it.

```
# show all available profiles
inspec supermarket

# execute kubernetes benchmark locally
inspec exec supermarket://dev-sec/cis-kubernetes-benchmark

# execute kubernetes benchmark against a ssh target
inspec exec supermarket://dev-sec/cis-kubernetes-benchmark -t ssh://user@host:port -i /path/to/key
```

Please let us know your feedback and report any [issues](https://github.com/dev-sec/cis-kubernetes-benchmark/issues).

# Independent Linux Benchmark

We see more and more workload is moving into containers. To secure linux containers, DevSec has provided [Linux Baseline](https://github.com/dev-sec/linux-baseline) and [SSH Baseline](https://github.com/dev-sec/ssh-baseline) for a very long time. With the addition of [CIS Distribution Independent Linux Benchmark](https://github.com/dev-sec/cis-dil-benchmark) we are able to extend our capabilities to provide an industry benchmark as well. You can use the profile by using the InSpec Supermarket, too:

```
# show all available profiles
inspec supermarket

# execute linux benchmark locally
inspec exec supermarket://dev-sec/dev-sec/cis-linux-benchmark

# execute linux benchmark against a ssh target
inspec exec supermarket://dev-sec/dev-sec/cis-linux-benchmark -t ssh://user@host:port -i /path/to/key

# execute linux benchmark against a docker container
inspec exec supermarket://dev-sec/dev-sec/cis-linux-benchmark -t docker://container_id
```

We hope you enjoy the new capabilities.

- Your DevSec Team

# References

- [Schuberg Philis](schubergphilis.com)
- [CIS Center for Internet Security](https://www.cisecurity.org/)
- [Docker Security Tool: InSpec CIS Docker Benchmark](https://atomic111.github.io/blog/inspec-cis-docker)
- [InSpec](https://www.inspec.io/)
