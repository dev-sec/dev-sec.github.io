---
title: "Migrating our Ansible roles to a collection"
date:   2020-11-08 09:00:00
authors:
- name: Sebastian Gumprich
  image: https://avatars0.githubusercontent.com/u/3198961?v=4
  link: https://www.zufallsheld.de
---

In July 2020 we decided to move our existing Ansible roles for Linux, ssh, nginx and MySQL into an Ansible collection ([what is a collection?](https://docs.ansible.com/ansible/latest/user_guide/collections_using.html)).

# Why?

Having only one repository for all roles means we don't have to duplicate code. We have one common test-suite for all roles that works the same for every role.
Also Collections are the future, as there is possibly no support for roles in the next version of Ansible Galaxy (see [ansible/galaxy_ng#58](https://github.com/ansible/galaxy_ng/issues/58)).

# Why not?

Collections are only supported from Ansible 2.9 and onwards. However Ansible 2.8 is still supported (https://docs.ansible.com/ansible/latest/reference_appendices/release_and_maintenance.html#release-status). This means we need to support the separate roles until 2.9 is the oldest maintained release.

# The plan

We decided to use the ansible-os-hardening git repository for our new collection because it has the most stars. We didn't want to lose our precious internet points!
We created a separate branch and worked on this one until the migration to the main branch was ready.
All the roles that lived in separate repositories should move to the `roles`-directory. It was important for us to keep the history of all roles. Fortunately we weren't the first ones who wanted to migrate one repository with its history to another. So with the help of StackOverflow, migrating them wasn't too hard.

The roles were tested with the help of test-kitchen (I wrote about it [here](https://www.zufallsheld.de/2016/01/05/testing-ansible-roles/)) and our trusted [Inspec Baselines](https://dev-sec.io/baselines/). We kept the baselines but replaced test-kitchen with molecule, the de-facto standard for testing Ansible content. This made it possible to test our collection in the same way locally as done in CI. Speaking of CI: We replaced travis (good riddance - Travis [changed](https://blog.travis-ci.com/2020-11-02-travis-ci-new-billing) their pricing model) with [Github Actions](https://github.com/features/actions).
Now every role inside the collection has its own pipeline that only runs when files from the role change. We still test our roles on a plethora of operating systems and the most important ones (CentOS and Ubuntu in its various versions) are all supported with all roles.

One problem with the new releases existed: since we wanted to re-use the ansible-os-hardening repository for the collection, we could not start from version 1.0.0 for the collection since the tag already existed. So to no break the old role we decided to continue the version from the role in the collection. This is why we started with version 7 in the collection.

Releasing new versions with a changelog was something we already [automated](https://github.com/dev-sec/ansible-os-hardening/issues/269) some time ago. We wanted to keep the nicely formatted changelogs and automatic releases and modifying the existing Github Actions was no problem.

Our plan how to actually migrate the roles into the collection looked like this: Start building the collection and use the roles as submodules inside the monorepo. This way we can continue to support the separate roles and the roles inside the collection cannot diverge from the legacy roles.

When everything was migrated, we planned to archive the old roles and link to the collection.

# Problems and other interesting things

There were some problems along the way but nothing we couldn't fix.

Along the creation of the collection we needed to update our inspec-baselines as they needed more features to support all our operating systems.
That means we now support newer versions of MySQL and MariaDB (https://github.com/dev-sec/mysql-baseline/pull/59, https://github.com/dev-sec/mysql-baseline/pull/57) and we support Arch Linux in the linux-baseline (https://github.com/dev-sec/linux-baseline/pull/136).

We also wanted to replace Inspec with its free distribution [cinc-auditor](https://cinc.sh/). This was surprisingly easy as the people behind cinc made it very easy to install cinc-auditor and use it as a drop-in replacement for Inspec. See this [commit](https://github.com/dev-sec/ansible-os-hardening/pull/291/commits/e7a47a1d342e1b45ceeeae7a1ff247f58ce3434e) for details.

There was an [issue](https://github.com/ansible/ansible/issues/66304) in Ansible that we needed to work around. This was done by [@schurzi](https://github.com/schurzi/) here: https://github.com/dev-sec/ansible-os-hardening/pull/291/commits/3f7598b5bae80f96cad3ad068f0d57b3e1e538ed

Our mysql-hardening-role relies on a existing installation of MySQL or MariaDB. For this we used geerlingguys mysql-role because it supports many operating systems. However the role has some issues and unmerged pull requests that prevented us to use geerlingguys role as is. We had to [fork](https://github.com/dev-sec/ansible-role-mysql/) the role and incorporate some PRs and fixes. We hope we don't have to continuously support the fork though.

The hardest bug we encountered was a problem with AppArmor and MySQL on recent Ubuntu distributions. Here's the bug: https://bugs.launchpad.net/ubuntu/+source/mysql-5.7/+bug/1610765.
A faulty AppArmor profile prevents MySQL from starting because AppArmor blocks access to MySQL's configuration files.
And Github Actions run on a Ubuntu 18.04 virtual machine with AppArmor enabled. So I wondered why the role does work when running molecule locally (btw: I use Arch) but not in the CI-pipeline.
It took some days to figure this one out. However once I found out the reason for this, the solution was found much faster. [Robert de Bock](https://robertdebock.nl/) also had this problem and fixed it [here](https://github.com/robertdebock/ansible-role-mysql/commit/7562e99099b06282391ab7ed102b393a0406d212)

We also dropped support for some operating systems:

* CentOS 6 because support ends in November 2020
* Oracle-Linux because supporting it is really cumbersome and we don't know anyone that uses our roles on Oracle

# The Result

It's here:

* [Galaxy](https://galaxy.ansible.com/ui/repo/published/devsec/hardening/)
* [Repository on Github](https://github.com/dev-sec/ansible-os-hardening/)

Please share your feedback with us, ask questions on the mailing list, open issues and pull requests on our repo!

# The future

We plan to archive the repositories of the roles incorporated in the collection and redirect everyone to the collection. The open issues and pull requests will be moved or closed.
This way, no code gets lost and (almost) no links will be broken.

Of course we want to continue working on the collection and support more operating systems and more software! If you want to help, reach out!

# Thanks

I want to thank the devsec team, especially [@micheelengronne](https://github.com/micheelengronne), [@schurzi](https://github.com/schurzi/) and [@chris-rock](https://github.com/chris-rock) for their work and support in creating the collection and this awesome opensource community!
