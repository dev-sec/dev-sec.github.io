---
title: "Our new homepage"
date:   2018-10-15 09:00:00
authors:
- name: Christoph Hartmann
  image: https://avatars3.githubusercontent.com/u/1178413?v=4
  link: https://lollyrock.com
---

Hi Security Friends,

We had this update in the works for a while and the new homepage is finally here. I'll look at some of the updates and encourage you to reach out for future improvements.

We finally migrated from our old custom-built pages to [Hugo](https://gohugo.io/) and combined our frontpage, blog and documentation into one single repository. This is easier to maintain and to contribute to. Besides these technical improvements, we also worked on the user experience, a fresh front-page, and a new contributor page, and and improved baseline overview.


### New contributor page

The DevSec project is driven by many contributors but it was not easily visible since the development is distributed over multiple repositories. Therefore, it was not easy to honor their contributions. We wrote a small script that uses the Github API to fetch all the information from each repositories and aggregated the results on a [new community page](https://dev-sec.io/community/). It shows all contributors, sorted by their contributions and a link to their github account.

![Contributors](/images/page_contributors.png)


### New baseline views

For some time now, we have tracked our security guidelines in baselines that are independent from the DevOps automation tool. We use [InSpec](https://inspec.io) to define the baselines and to verify our Ansible, Chef, and Puppet remediation modules in an automatic way. Until today, it was challenging for users to see all baseline controls without looking into the baseline source code. Since we aim to enable everybody to understand and see our security guidelines, a new visualization was required.

We updated our existing feature overview and linked it to our new [profile viewer](https://github.com/arlimus/inspeculus).

![Baselines](/images/page_overview.png)

You can click on each benchmark to see baseline details and their controls. In addition, you find the links for the Ansible, Chef and Puppet at the top of the baseline viewer.

![Baselines](/images/page_baselines.png)

We hope you enjoy these new views!


Have a hacky day,
Chris
