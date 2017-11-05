---
title: "Contributing"
date:   2015-04-15 21:00:00
---

# Contributing

The general steps are:

- Create a ticket in Github Issues.
- Fork the repository on GitHub.
- Clone the repository on your local system.
- Create a branch and make your changes.
- Push the branch, create a pull request and [reference the issue in your pull request](https://github.com/blog/1506-closing-issues-via-pull-requests).

Read on for detailed steps

## License

This project is Apache 2 licensed. Every contribution must be under the Apache 2 License too. For new files we have added a section with [License Headers](/docs/license-headers).

### Sign your work

In addition to the license we only accept contributions signed as your work. The sign-off is a simple line at the end of the explanation for the patch, which certifies that you wrote it or otherwise have the right to pass it on as an open-source patch. The rules are pretty simple: if you can certify the below (from [developercertificate.org](developercertificate.org)):

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
660 York Street, Suite 102,
San Francisco, CA 94110 USA

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.


Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

then you just add a line to every git commit message:

    HardeningFramework-DCO-1.1-Signed-off-by: Joe Smith <joe.smith@email.com> (github: github_handle)

using your real name (sorry, no pseudonyms or anonymous contributions.)

One way to automate this, is customise your get ``commit.template`` by adding
a ``prepare-commit-msg`` hook to your hardening project checkout:

```
curl -o .git/hooks/prepare-commit-msg https://raw.githubusercontent.com/hardening-io/docs/master/docs/contrib/prepare-commit-msg.hook && chmod +x .git/hooks/prepare-commit-msg
```
* Note: the above script expects to find your GitHub user name in ``git config --get github.user``, set it with `git config --global github.user <username>`


## Contributing to the Hardening Framework Projects

Below, replace "REPO" with the project that should be changed. Replace "USER" with your GitHub username.

0. Create a issue for the bug, feature or improvement you are contributing.

See [Mastering Issues](https://guides.github.com/features/issues/) for details

1. Fork the repository on GitHub.

    HardeningFramework/REPO -> USER/REPO

    You can replace REPO in your fork with a name for the repository
    that makes it unique, if required.

2. Clone the repository locally

    ```
    git clone git@github.com:USER/REPO.git
    ```

3. Ensure the origin is your repository.

    ```
    git config remote.origin.url git@github.com:USER/REPO.git
    ```

4. Add Hardening Framework REPOs as a remote named `upstream` and track it
instead of your origin.

    ```
    git remote add upstream git://github.com/hardening-io/REPO.git
    git config branch.master.remote upstream
    ```

5. Make sure your master branch is updated.

    ```
    git checkout master
    git pull --rebase
    ```

6. Create a new branch for the ticket.

    ```
    git checkout -b ISSUE-####
    ```

7. Make your changes and push the branch to your origin.

    ```
    git push origin ISSUE-####
    ```

8. [Reference the ISSUE](https://github.com/blog/1506-closing-issues-via-pull-requests) in your [Github Pull Request](https://help.github.com/articles/using-pull-requests). We will review the issue and contribution as soon as possible.

### Some Tips

In order to have your contribution accepted as quickly as possible, we have some requests for you. These make it easier to merge contributions without merge conflicts, and keep the scope on topic for a specific issue.

- Please do not update the version in the metadata.rb (chef) or Modulefile/metadata.json (Puppet) files. We handle that as part of the release process.
- Please do not update the CHANGELOG.md. We handle that as part of the release process.
- Please do not mix style changes that are not related to the specific ticket. Create a new, separate ticket for style updates. For example, if a REPO has  Foodcritic findings, create a separate ticket to handle those. See the section on linting.
- Follow the current style of the code where appropriate.
- Run the provided lint, spec and integration tests
