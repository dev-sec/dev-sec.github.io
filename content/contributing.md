---
title: "Contributing"
date:   2015-04-15 21:00:00
layout: contributing
---

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

## Git Hook

`prepare-commit-msg.hook`

```bash
#!/bin/sh
#       Auto sign all commits to allow them to be used by the Hardening Framework project.
#       see https://github.com/hardening-io/docs/blob/master/docs/how-to-contribute.md#sign-your-work
#
GH_USER=$(git config --get github.user)
SOB=$(git var GIT_AUTHOR_IDENT | sed -n "s/^\(.*>\).*$/DevSecHardeningFramework-DCO-1.1-Signed-off-by: \1 \(github: $GH_USER\)/p")
grep -qs "^$SOB" "$1" || {
	echo
	echo "$SOB"
} >> "$1"
```


## File Headers

### Ruby
```ruby
# encoding: utf-8
#
# Copyright 2018, DevSec Hardening Framework Team
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
```

### JavaScript
```javascript
/* Copyright 2018 DevSec Hardening Framework Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

### Python

```python
# Copyright 2018 DevSec Hardening Framework Team
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
```

### HTML

```html
<!--
Copyright 2018 DevSec Hardening Framework Team

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
```


## Linting

We run several linting tools in our continuous integration pipeline. If you create a pull request the CI will kick in and run [Rubocop](https://github.com/bbatsov/rubocop) for every project as well as [Foodcritic](http://www.foodcritic.io) for chef repos or [puppet-lint](http://puppet-lint.com) for puppet repos. The tasks are provided as Rake Tasks ready to run an give feedback.

Here the example output of the [chef-os-hardening project](https://github.com/hardening-io/chef-os-hardening) (kitchen-tasks stripped):

```shell
± bundle exec rake -T
rake acceptance                                 # Alias for kitchen:all
rake foodcritic                                 # Run foodcritic lint checks
rake integration                                # Run all tests except Kitchen (default task)
rake kitchen:all                                # Run all test instances
[ ... kitchen-tasks stripped ... ]
rake lint                                       # Run linters
rake rubocop                                    # Run Rubocop lint checks
rake run_all_linters                            # Run all linters: rubocop and foodcritic
rake spec                                       # Run chefspec tests
rake test                                       # Run all tests
```

The CI is configured to run the common task `rake run_all_linters ` in all the projects. Example of a successful run:

```shell
± bundle exec rake run_all_linters
Running RuboCop...
Inspecting 20 files
....................

20 files inspected, no offences detected
Running Foodcritic tests...
done.

± echo $?
0
```

The CI evaluates the return code of the task, which is `0` if no offences are found.

The task will fail fast. Meaning we run [Rubocop](https://github.com/bbatsov/rubocop) first and the specific linter (if any) next. A failed run of rubocop looks like the following output:

```
± bundle exec rake run_all_linters
Running RuboCop...
Inspecting 20 files
....C...............

Offences:

recipes/default.rb:22:1: C: Extra blank line detected.

20 files inspected, 1 offence detected
RuboCop failed!

± echo $?
1
```

The exit code is `1` indicating that one of the linters involved found an offence. Following an example in a chef cookbook were rubocop is successful but foodcritic found an offence:

```shell
± bundle exec rake run_all_linters
Running RuboCop...
Inspecting 20 files
....................

20 files inspected, no offences detected
Running Foodcritic tests...
done.
FC019: Access node attributes in a consistent manner: /.../recipes/default.rb:29
rake aborted!
FC019: Access node attributes in a consistent manner: /.../recipes/default.rb:29
/.../.rvm/gems/ruby-2.1.1/gems/foodcritic-3.0.3/lib/foodcritic/rake_task.rb:33:in `block in define'
/.../.rvm/gems/ruby-2.1.1/bin/ruby_executable_hooks:15:in `eval'
/.../.rvm/gems/ruby-2.1.1/bin/ruby_executable_hooks:15:in `<main>'
Tasks: TOP => run_all_linters => foodcritic
(See full trace by running task with --trace)

± echo $?
1
```

### Ruby - Rubocop

[Rubocop](https://github.com/bbatsov/rubocop) catches a lot of basic syntax infractions and provides ruby best practice advise like using double quotes for strings that do not interpolate Ruby variables, or using simple if/else statements when a one-line ternary operator would be sufficient. This helps enforcing a common style guide and avoiding time consuming best practice discussions in pull requests. Have a look at [A community-driven Ruby coding style guide](https://github.com/bbatsov/ruby-style-guide) for further details.

Every project has a rake task to run rubocop as well as a task were all linters for the project are run, including rubocop:

```
± bundle exec rake -T|grep rubocop
rake rubocop                                    # Run Rubocop lint checks
rake run_all_linters                            # Run all linters: rubocop and foodcritic
```

Rubocop honors the `.rubocop.yml` file of the project.

Example successful run of rubocop:

```shell
± bundle exec rake rubocop
Running RuboCop...
Inspecting 6 files
......

6 files inspected, no offences detected

± echo $?
0
```

### Chef - Foodcritic

[Foodcritic](http://www.foodcritic.io) is a special linter for chef cookbooks. The rake task is configured to fail on `any` violation. We, as a project, decided to use the single quoted string node attribute notation to honor [FC019](http://www.foodcritic.io/#FC019).

There are some edge cases were, upon discussion a violation is tolerated. This can be done with a special markup in the code itself. Following an example (taken from [chef-ssh-hardening server.rb](https://github.com/hardening-io/chef-ssh-hardening/blob/master/recipes/server.rb#L41))

```ruby
  search('users', "#{field}:*").map do |v| # ~FC003 ignore footcritic violation
    Chef::Log.info "ssh_server: installing ssh-keys for root access of user #{v['id']}"
    v[field]
  end.flatten
```

Here we acknowledge [FC003](http://www.foodcritic.io/#FC003) as this cookbook will always need search in order to work and we use solo-search in testing.

Every chef project has a rake task to run foodcritic as well as a task were all linters for the project are run, including rubocop:

```
± bundle exec rake -T |grep foodcritic
rake foodcritic                        # Run foodcritic lint checks
rake run_all_linters                   # Run all linters: rubocop and foodcritic
```

Example successful run of foodcritic

```
± bundle exec rake foodcritic
Running Foodcritic tests...
done.

± echo $?
0
```

### Puppet - Puppet-Lint

[Puppet-Lint](http://puppet-lint.com) is a special linter for puppet modules. The rake task is configured to fail on `any` violation.

```
± bundle exec rake -T |grep puppet-lint
rake lint             # Run puppet-lint / Check puppet manifests with puppet-lint
rake run_all_linters  # Run all linters: rubocop and puppet-lint
```

We disabled some checks from puppet-lint

```
± grep Lint Rakefile
PuppetLint.configuration.send('disable_autoloader_layout')
PuppetLint.configuration.send('disable_80chars')
PuppetLint.configuration.send('disable_inherits_across_namespaces')
PuppetLint.configuration.fail_on_warnings = true
PuppetLint.configuration.ignore_paths = ['vendor/**/*.pp']
```

If everything is well the exit code is 0, and no further output is displayed:

```
± bundle exec rake lint
± echo $?
0
```

If there is an error or a warning you get some output and an exit code <> 0
```
± bundle exec rake lint
manifests/init.pp - WARNING: double quoted string containing no variables on line 10
rake aborted!

/.../.rvm/gems/ruby-2.1.1/gems/puppet-lint-0.3.2/lib/puppet-lint/tasks/puppet-lint.rb:25:in `block (2 levels) in initialize'
/.../.rvm/gems/ruby-2.1.1/gems/puppet-lint-0.3.2/lib/puppet-lint/tasks/puppet-lint.rb:13:in `block in initialize'
/.../.rvm/gems/ruby-2.1.1/bin/ruby_executable_hooks:15:in `eval'
/.../.rvm/gems/ruby-2.1.1/bin/ruby_executable_hooks:15:in `<main>'
Tasks: TOP => lint
(See full trace by running task with --trace)

± echo $?
1
```
