---
title: "Applications"
layout: applications
---

# [Vulcan](https://)

### Description

Vulcan is a tool to help streamline the process of creating STIGs and InSpec security compliance profiles. It models the STIG intent form and
the process of aligning security controls from SRG items into actual STIG security controls.  Vulcan also gives the option while aligning the security controls to
insert inspec code and test across any type of system supported by InSpec.     

### Features

* Model the STIG creation process between the creator(vendor) and the approver(sponsor)
* Write and test InSpec code on a local system, or across SSH, AWS, and Docker
* Easily view the progress on what the status is of each control
* Communicate through the application to make the best decisions on controls
* Confidential data in the database is encrypted using symmetric encryption
* Authenticate via the local server, through github, and through configuring an LDAP server.

### Screenshots

Dashboard


# [Heimdall](https://github.com/mitre/heimdall)

Heimdall is a centralized aggregation tool for InSpec evaluations

### Description
Heimdall supports viewing of InSpec profiles and evaluations in a convenient
interface.  Data uploads can be automated through usage of curl, and added as
a step after an InSpec pipeline stage.   

### Heimdall vs Heimdall-Lite

There two versions of the MITRE Heimdall Viewer - the full [Heimdall](https://github.com/mitre/heimdall/) and the [Heimdall-Lite](https://github.com/mitre/heimdall-lite/)  version. We produced each to meet different needs and use-cases.

### Features

|  | [Heimdall-Lite](https://github.com/mitre/heimdall-lite/) | [Heimdall](https://github.com/mitre/heimdall/) |
|:--------------------------------------------------------------------------|:--------------|:-------------------------------------|
| Installation Requirements | any web server | rails 5.x Server <br /> MongoDB instance |
| Overview Dashboard & Counts | x | x |
| 800-53 Partition and TreeMap View | x | x |
| Data Table / Control Summary  | x | x |
| InSpec Code / Control Viewer | x | x |
| SSP Content Generator | x | x |
| PDF Report and Print View | x | x |
|  |  |  |
| Users & Roles & multi-team support |  | x |
| Authentication & Authorization | Hosting Webserver | Hosting Webserver<br />LDAP<br />GitHub OAUTH & SAML<br />GitLab OAUTH & SAML |
| Advanced Data / Filters for Reports and Viewing |  | x |
| Multiple Report Output<br />(DISA Checklist XML, CAT, XCCDF-Results, and more) |  | x |
| Authenticated REST API |  | x |
| InSpec Run 'Delta' View |  | x |
| Multi-Report Tagging, Filtering and Compairison |  | x |

### Use Cases

| [Heimdall-Lite](https://github.com/mitre/heimdall-lite/) | [Heimdall](https://github.com/mitre/heimdall/) |
|:------------------------------------|:--------------------------------------------------------|
| Ship the App & Data via simple Email | Multiple Teams Support |
| Minimal Footprint & Deployment Time | Timeline and Report History |
| Local or disconnected Use | Centralized Deployment Model  |
| One-Time Quick Reviews | Need to view the delta between one or more runs |
| Decentralized Deployment  | Need to view subsets of the 800-53 control alignment |
| Minimal A&A Time | Need to produce more complex reports in multiple formats |

### Screenshots

Dashboard
