# e-TB Manager for Bangladesh

## Goal

This repository contains the source code of e-TB Manager 2.3 customized to the NTP in Bangladesh.

e-TB Manager is a web-based tool for managing all the information needed by national tuberculosis control programs (NTP). It integrates data across all aspects of TB control, including information on suspects, patients, medicines, laboratory testing, diagnosis, treatment, and outcome.

## Architecture

In terms of software architecture, e-TB Manager has the following specification:

* Database: MySQL 5.6+
* Language: Java 1.6+ using JEE 1.5
* Application server: JBOSS AS 4.2.3.GA (customized)

## Getting started

### Pre requisites

In order to build e-TB Manager from the source code, you will need the following programs installed:

* Java JDK 1.6+
* Maven 3+
* JBOSS 4.2.3.GA, in order to run the application in development side

> The version of JBOSS AS in use was customized with some specific libraries, like the MySQL and
> Hibernate libraries. You may download JBOSS AS used in e-TB Manager from the link
> [http://www.etbmanager.org/download/package/jboss-4.2.3.ga.zip](http://www.etbmanager.org/download/package/jboss-4.2.3.ga.zip)
 

### Development tools

Any JEE development environment of your choice - Recommended: `IntelliJ` for development

Installation instructions can be found in the site of each one of these programs.

## Frameworks and libraries

Below is the list of frameworks and libraries used in e-TB Manager.

* JPA 1.0 (baked by Hibernate 3.3);
* JSF 1.2;
* JBOSS SEAM 2.1;
* Spring JPA, using Hibernate;
* Apache common libs;
* Liquibase for automatic database upgrade;

### Client side
* jQuery 1.8;
* RichFaces 3 (JSF components);

All these frameworks are ***automatically*** loaded by Maven, so the list is just a reference.


## Development environment

You need the following tools in order to start development:

* Git
* Java 1.6+
* Maven 3+
* MySQL 5.6+
* A development environment of your choice (IntelliJ recommended)

### Downloading the source code

The source code is stored in a Git repository, and the current Git URL is:

https://rmemoria@bitbucket.org/rmemoria/nigeria.git

To download the code, issue the git command

    git clone https://rmemoria@bitbucket.org/rmemoria/nigeria.git

You will need a user name and password for that.

Inside the repository, there are two main branches: `master` and `development`. The master contains the stable version, and should be merged with stable versions achieved in the development branch. So, if you want to change the code, move to the development branch:

	git checkout development

When you finish your changes, perform the following git sequence (as described in the git documentation):

1. Add all changed files to be committed

	git add .

2. Commit the changes providing a good description

	git commit -m "description of the changes"

3. Upload the changes to the remote server

    git push origin development



### Building from the source code

In order to generate a new version of e-TB Manager from the source code, you must issue the following Maven command:

    mvn clean package -P production

This will install all necessary dependencies and generate a new version in `target/etbmanager-ng.war`.

### Configuration file

Before running e-TB Manager, it is necessary to create two configuration files in the <jboss>/server/default/deploy/MSH:

* etbmanager-ds.xml - Configure how e-TB Manager will connect to the database;
* etbmanager-service.xml - Configure a SMTP server that e-TB Manager will use to dispatch e-mail messages;
 
There is an example of both files in the */resources* folder.

### Running e-TB Manager

In order to run e-TB Manager, just copy the generated file \target\etbmanager-ng.war to the folder

<jboos>/server/default/deploy/MSH

This version of JBOSS supports hot deployment, so you may replace the war file at any time to have it deployed again by JBOSS AS. 

## Development

As mentioned before, the recommended IDE is IntelliJ. The best way ti integrate JBOSS AS to your development environment
is to edit the configurations in the right side of the tool bar and create a new JBOSS server configuration, as displayed
below:

