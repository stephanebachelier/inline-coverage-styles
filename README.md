# Inline coverage styles

[![Build Status](https://travis-ci.org/stephanebachelier/inline-coverage-styles.svg?branch=master)](https://travis-ci.org/stephanebachelier/inline-coverage-styles)
[![codecov](https://codecov.io/gh/stephanebachelier/inline-coverage-styles/branch/master/graph/badge.svg)](https://codecov.io/gh/stephanebachelier/inline-coverage-styles)

## Description

Inline CSS stylesheets into HTML files.

The goal of this project is to fix an issue on VSTS or Azure devops, where code coverage report assets can't be loaded, as the reports are loaded in a sandboxed iframe.

See :
 - Github issue on [azure-pipelines-tasks](https://github.com/Microsoft/azure-pipelines-tasks/issues/3027) repository.
 - [Article](https://davidsekar.com/aspnetcore/code-coverage-html-reports-are-missing-styles-in-vsts)  from `vsts-coverage-styles` author.

*Nota Bene*

This project can be used not only for inlining linked stylesheets in HTML code coverage reports, but also for any folder with HTML files.

## Installation

Locally :

 - npm : `npm i inline-coverage-styles`
 - yarn : `yarn add inline-coverage-styles`

Or globally :

 - npm : `npm i -g inline-coverage-styles`
 - yarn : `yarn global add inline-coverage-styles`

## Usage

```
const ics = require('inline-coverage-styles')

ics({ baseDir: 'coverage' })
```

## Options

### baseDir: string (required)

The **absolute path** to the coverage report directory. A relative path might work but it's not tested.

### css: string (optional)

A string with a bunch of css rules to inject in a `<style>` tag. Injected before the `<head>` closing tag to avoid any cascade issue.

## Examples

Two examples are provided in this repository:
 - [Inlining coverage](examples/inline_coverage.js)
 - [Inlining coverage with extra css injection](examples/inline_coverage_with_extra_css.js)

To run these tests :
 - clone this repository
 - `yarn install`
 - `yarn run test && node ./examples/inline_coverage.js`
 - or `yarn run test && node ./examples/inline_coverage_with_extra_css.js`

## Roadmap

 - [ ] Add CLI
 - [ ] Increase code coverage
 - [ ] test support for relative path

## Inspiration & motivation

These project is directly inspired from [vsts-coverage-styles](https://www.npmjs.com/package/vsts-coverage-styles).
I've decided to build this project :

 - `vsts-coverage-styles` is difficult to mock in my custom build processes,
 - `vsts-coverage-styles` does not have tests,
 - I wanted to have a solution with streams instead of having the whole file loaded in memory, to avoid memory issues. Some coverage folders may have a log of HTML reports files.
 - There is no caching of linked CSS files in memory contrary to `vsts-coverage-styles`. The linked stylesheets are first minified and then only the minified version will be loaded from filesystem using stream.
