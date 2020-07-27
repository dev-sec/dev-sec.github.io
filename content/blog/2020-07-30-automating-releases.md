---
title: "Automating dev-sec releases with Github Actions"
date:   2020-05-30 09:00:00
authors:
- name: Sebastian Gumprich
  image: https://avatars0.githubusercontent.com/u/3198961?v=4
  link: https://www.zufallsheld.de
---

Hey friends,

some time ago someone who uses our Ansible roles created an [issue](https://github.com/dev-sec/ansible-os-hardening/issues/269) in our ansible-os-hardening role stating that the readme in the Ansible Galaxy diverged from the actual releases you can find on Galaxy.
The reason for that is simple: Galaxy shows the from the master-branch in the Github-repository - *not* from the latest release that is uploaded there.
That produced a discrepancy between the functions of the role and what is described in the readme.
Since I did not have time to create a new release for os-hardening (it was done manually at the time), the contents diverged quite heavily.

This real and important problem lead me to automating the releases of the Ansible roles.

Our manual workflow consisted of (1) updating the CHANGELOG with the [github-changelog-generator](https://github.com/github-changelog-generator/github-changelog-generator), (2) finding out what the next version number should be by looking at the PRs, then (3) creating a new tag with this version number and finally (4) releasing a new version of Github. Ansible Galaxy then automatically published a new version from the Github release.

My requirements for automating this where:

* keep the CHANGELOG and continue using the generator since it works pretty well
* The release version should be automatically decided upon, based on the PRs
* A Release draft should be created that I then can check and publish manually

I then started experimenting with Github Actions (since I hadn't worked with it before and wanted to try it).
I searched the Actions Marketplace for Actions that could help me accomplish my goal.

The initial Action only created and pushed a changelog every time a new PR was merged, issued were closed or releases published:

```
name: Changelog

on:
  pull_request:
    types: [closed]

  release:
    types: [published]

  issues:
    types: [closed, edited]

jobs:
  generate_changelog:
    runs-on: ubuntu-latest
    name: Generate changelog for master branch
    steps:
      - uses: actions/checkout@v1

      - name: Generate changelog
        uses: charmixer/auto-changelog-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: push
        uses: github-actions-x/commit@v2.6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          push-branch: 'changelog'
          commit-message: 'update changelog'
          force-add: 'true'
          files: CHANGELOG.md
          name: dev-sec CI
          email: hello@dev-sec.io
```

I continued experimenting and created a second action that did:

- get the previous tag (to generate the changelog from this tag)
- get the next tag with the help of labels on PRs (major, minor, patch)
- generate a changelog
- create a release draft with the generated changelog and the release- and tag-name of the next tag

You can find the code here: https://github.com/rndmh3ro/ansible-os-hardening/blob/7.0.0/.github/workflows/release.yml

So now I had two actions: one for creating a continously updated changelog and one for creating release drafts. I was fine with this for now.

Then [@micheelengronne](https://github.com/micheelengronne) picked up my work and continued improving the Action. He applied the Action on our Inspec baselines and unified the two actions into one. You can find the code here: https://github.com/dev-sec/ssl-baseline/actions/runs/109370590/workflow

So now all our Inspec-baselines and Ansible-roles have almost-automatic releases: whenever someone merges a PR, a release-draft is created containing the changes in a nicely formatted changelog - ready to be released by the push of a button!
