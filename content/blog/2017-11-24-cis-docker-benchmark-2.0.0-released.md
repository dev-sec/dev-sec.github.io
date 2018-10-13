---
title: "cis-docker-benchmark 2.0.0 is released"
date:   2017-11-24 11:00:00
authors:
- name: Patrick Muench
  image: https://avatars1.githubusercontent.com/u/7220740?v=4
  link: https://twitter.com/atomiczero111
---

DevSec Hardening Framework project is releasing a new major release of [cis-docker-benchmark](https://github.com/dev-sec/cis-docker-benchmark/releases/tag/2.0.0) today.

The major points of this release are listed below, however there are also many changes under the hood like cleanups of documentation and improvements of the InSpec Profile.

Many thanks for the contributions and help we received from our users and community!

**Highlights and breaking changes:**

- Update of InSpec Profile to support the [CIS Docker Benchmark 1.13.0](https://downloads.cisecurity.org/#/)
- Introduce new Tags `tag 'cis-docker-1.13.0': '4.1'` to easily identify the right CIS Control
- Update of descriptions to explain each control in a better manner
- Update of references to support the user in implementing each control
- Renumbering of InSpec controls to be independent from the CIS Docker Benchmark numbering, because we want to keep the old controls.
- Activate old controls via new attribute `benchmark_version`
- New library method to check, if docker overlay networks are encrypted

**New attributes:**

- `benchmark_version` to execute also the old controls from previous benchmarks, e.g. set it to 1.12.0 to execute also the tests from cis-benchmark-1.12.0

Please checkout the [full changelog](https://github.com/dev-sec/cis-docker-benchmark/blob/master/CHANGELOG.md) and [README](https://github.com/dev-sec/cis-docker-benchmark/blob/master/README.md) for more details.

We are looking forward to get your feedback via [GitHub issues](https://github.com/dev-sec/cis-docker-benchmark/issues) or [Gitter chatroom](https://gitter.im/dev-sec/general). And you can follow us on [Twitter](https://twitter.com/DevSecIO).
