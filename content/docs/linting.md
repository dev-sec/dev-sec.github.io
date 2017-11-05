---
title: "Linting"
date:   2015-04-15 21:00:00
---

# Linting

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
