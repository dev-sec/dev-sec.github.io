---
title: "DevSec Project"
layout: project
---

## Challenge

Running secure infrastructure is a difficult task. Although server hardening is a well-known topic with many guides out in the wild, it is still very cumbersome to apply and verify secure configuration. If you manage many server, they need to be configured properly and maintained, which is difficult and time-consuming to get right. To answer these needs for security, compliance, and maintainability, we decided to launch this project as a common ground for requirements and their fulfillment.

The project founders where tasked with the challenge to automate different security requirements of Deutsche Telekom for their infrastructure. Deutsche Telekom, T-Labs and Telekom Security funded the initial research and allowed the team to open source the automation to help foster a more secure world.

## Vision / Goal

Our goal is simple: Create a common layer for operating system and services hardening. Even if you aren't knee-deep in configuration manuals for services or the latest security recommendations, you will be able to implement and use this framework with ease.

## Scope

Since we use Ansible, Chef and Puppet to automate our deployments, we decided to put them to work for system hardening. The hardening project is currently limited to Ansible, Chef and Puppet, though extensions to other automation frameworks are welcome!

**What is part of hardening?**

* **Attack surface reduction**: Use service configurations to remove all those components, that are often activated for legacy compatibility or simplified setups. Some default configurations these days already cover good security practices. We take a step further and make sure to deactivate all application modules, which aren't usually required. This baseline changes over time. We keep track of these developments and integrate them with this project.

* **Secure configuration**: It's easy enough to find a guide in a 2 minute search which will tell you to "Set this to 0 and everything will work". Without investigation, it's difficult to know what implications a few configuration lines may carry. Moreover, even a simple starting configuration can quickly make it into a production setup. To avoid these easy mistakes, we make the configuration explicit and default to a secure baseline. Many settings aren't changeable and some will yield errors and warnings with this framework.

* **Core components**: Anything from the basic operating system to well known databases and web servers is part of this project. We want these common building blocks to be at their optimal configuration and avoid repeated mistakes.

**What is NOT part of hardening?**

* **Patch management**: We track changes and will update every piece of this project to work with current and older supported versions of operating systems and applications. However, we cannot safely automate all aspects of patch management. Nevertheless, you can easily integrate hardening into your patch management lifecycle.

* **Minor components**: It's easy to set up a configuration for a service at some point of time and make it secure. It's much more difficult to maintain it over time and support it. We will focus on wide-spread services and components and support them with your and our feedback.

* **Complex configurations**: This includes: Firewall configurations, web-application firewalls, AppArmor profiles or SELinux configurations, amongst others. These are incredibly important to have in your environment, however, their configuration is too dependent on specific setups to abstracted properly. We decided to focus on those components, that are able to take a generalized into their configuration. For everything else, feel free to get in touch with us.

## Lifecycle

Let's take a quick look at the full lifecycle for servers and services and see where hardening fits in.

### Installation of OS

We recommend to install operating systems from trusted sources. This could be an operating system vendor or a trusted third party e.g. cloud provider like AWS, Azure or Google Cloud.

### Server Hardening

We provide a collection for Ansible, multiple cookbooks for Chef and modules for Puppet to cover this area. We use best-known guides like [Deutsche Telekom](https://www.telekom.com/en/corporate-responsibility/data-protection-data-security/security/details/privacy-and-security-assessment-process-358312), [BetterCrypto](https://bettercrypto.org/) and the [NSA hardening guide](https://apps.nsa.gov/iaarchive/library/ia-guidance/security-configuration/operating-systems/guide-to-the-secure-configuration-of-red-hat-enterprise.cfm). For more details look into the respective `test-<project>` repository. Checks are implemented following these guides.

### Continuous management

This area includes tasks like patch management, attack monitoring, and fixing known vulnerabilities. None of these areas are covered in this hardening project.

#### Patch management

It is the heart of keeping your systems secure once everything is in place. So why not patch automatically on every run? We have considered this option for our hardening components but ultimately decided against it: Patches generally aren't a trivial thing to do. Even if you reduce it to security updates only, there may still be regressions which have to be weighted against benefits. Set up a patch management system of your choice.

#### Attack monitoring

Hardening includes a small section of compliance monitoring. Every time an attacker changes a core system configuration, you can gain insights into this through hardening. Since all of our components are tested independently, you can potentially use these tests to validate the compliance of your configuration. However, we recommend against putting too much weight on the results you get. The tests created here are written to verify hardening instructions. Attackers may still find ways to modify files in a way that gets around these checks (example: if we check `main.cfg` only, but attacker writes to `main.cfg.d/my.cfg`). Use HIDS, auditing, and monitoring systems to manage these risks.

#### Vulnerability fixes

A remainder of vulnerabilities may still remain after successful patch management. There are vulnerabilities that need mitigation before proper vendor fixes are released. We won't cover such vulnerabilities in this project. Many settings, however, are meant to reduce the attack surface and thus directly contribute to reducing the risks from unpatched vulnerabilities.
