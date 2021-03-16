# NHS.UK prototype kit Changelog

## 4.3.0 - 16th March 2021

:new: **New features**

- Install NHS.UK frontend v5.0.0
- Update package dependencies to latest versions

## 4.2.0 - 25 February 2021

:new: **New features**

- Add `outerContent` block to page template.
  
  Add content that needs to appear outside `<main>` element but inside the `<nhsuk-width-container>`.
  
  For example: The back link component.

- Update page template examples

:wrench: **Fixes**

- Update package dependencies to latest versions
- Use the latest version of jQuery (3.5.1)

## 4.1.0 - 21 January 2021

:new: **New features**

- Install [NHS.UK frontend v4.1.0](https://github.com/nhsuk/nhsuk-frontend/blob/master/CHANGELOG.md#410---21-january-2021)

:wrench: **Fixes**

- Update package dependencies to latest versions
## 4.0.0 - 27th October 2020

:boom: **Breaking changes**

- Remove the custom Phase banner component
- Remove the custom Tag component and use the Tag component from the NHS.UK frontend library
- Update the class names for the Confirmation panel which now uses the Card component
- Remove the custom panel confirmation styles

:new: **New features**

- Install [NHS.UK frontend v4.0.0](https://github.com/nhsuk/nhsuk-frontend/blob/master/CHANGELOG.md#400---26-october-2020) which includes the new Tag and Card components

:wrench: **Fixes**

- Remove HTML empty whitespace in the layout file caused by the nunjucks macro includes
- Add missing button on the passing data page to page examples
- Update package dependencies to latest versions
- Update confirmation page example to use new card component

## 3.1.0 - 24th April 2020

:new: **New features**

- Install NHS.UK frontend v3.1.0 which includes conditional Checkboxes and Radios
- Update package dependencies to latest versions

## 3.0.10 - 25th March 2020

:wrench: **Fixes**

- Install latest version of NHS.UK frontend (3.0.4)
- Update package dependencies to latest versions

## 3.0.9 - 18th March 2020

- Update package dependencies to latest versions

## 3.0.8 - 17th February 2020

:wrench: **Fixes**

- Use the latest version of the NHS.UK frontend library (3.0.3)
- Update package dependencies to latest versions

## 3.0.7 - 10th February 2020

:new: **New features**

- Add phase banner and tag components

## 3.0.6 - 7th November 2019

:wrench: **Fixes**

- Update to NHS.UK frontend v3.0.0

## 3.0.5 - 29th October 2019

- Add support for Node 12.x

  Node 12.x recently became the long term supported version of Nodejs. The `gulp-sass` dependency had a peer dependency pinned to specific version `node-sass` that doesn't work on Node 12.x. Node 12.x support got added to `node-sass` in `4.12.0` and above.

- Update package dependencies to latest versions

## 3.0.4 - 2nd October 2019

- Use the latest version of the NHS.UK frontend library (v2.3.2)
- Update package dependencies to latest versions

## 3.0.3 - 11th September 2019

:wrench: **Fixes**

- Use the latest version of the NHS.UK frontend library (v2.3.1)
- Update package dependencies to latest versions

## 3.0.2 - 29th August 2019

:wrench: **Fixes**

- Update to NHS.UK frontend v2.3.0
- Update package dependencies to latest versions
- Use the lede text class on paragraphs below the page headings

## 3.0.1 - 24th June 2019

:wrench: **Fixes**

- Update to NHS.UK frontend v2.2.0 and use the new favicons
- Update package dependencies to latest versions

## 3.0.0 - May 14, 2019

:boom: **Breaking changes**

- Layouts - restructure and tidy page layouts so they are easier to understand and edit

:wrench: **Fixes**

- Update package dependencies

## 2.0.1 - April 15, 2019

:wrench: **Fixes**

- [Change mini-hub example to two-thirds column](https://github.com/nhsuk/nhsuk-prototype-kit/issues/109)

## 2.0.0 - April 4, 2019

:new: **New features**

- Documentation for updating the kit

:wrench: **Fixes**

- [Moved main.js below jQuery in scripts.html](https://github.com/nhsuk/nhsuk-prototype-kit/issues/98)

- Reorder the asset `preconnect` and remove unneeded `dns-prefetch` ([Issue 104](https://github.com/nhsuk/nhsuk-prototype-kit/issues/104)) and also reordered attributes based on [frontend coding standards](https://github.com/nhsuk/nhsuk-frontend/blob/master/docs/contributing/coding-standards.md#html)

- Update package dependencies including latest version (2.1.0) of the NHS.UK frontend

:boom: **Breaking changes**

- Examples and templates - have been moved from the app folder into the docs folder to allow updates without affecting the users prototype app folder

## 1.0.3 - Mar 11, 2019

:wrench: **Fixes**

- Updated the passing data page to page example and updated various page examples
- Use the latest version of the NHS.UK frontend library (2.0.0) which includes the summary list component
- Use the summary list from the NHS.UK frontend library and remove the custom code from the prototype kit

## 1.0.2 - Mar 4, 2019

:wrench: **Fixes**

- Documentation and examples for adding custom JavaScript, images or other assets.
- All files put into the `app/assets` folder will automatically be copied to the public directory for use in web pages.

## 1.0.1 - Feb 21, 2019

:new: **New features**

-  [Installation guides update for Windows and Mac following testing with users](https://github.com/nhsuk/nhsuk-prototype-kit/pull/68)
- The prototype kit now is properly versioned and is the version is indicated in `package.json` `version` field and also on the index page of the docs.

:wrench: **Fixes**

-  [Header and footer inconsistency on the branching examples](https://github.com/nhsuk/nhsuk-prototype-kit/issues/71)
-  Fix inconsistencies with page titles, should be `Page name - NHS.UK prototype kit`

## 1.0.0 - Feb 5, 2019

:tada: **Official release of the NHS.UK prototype kit**

- v1.0.0 of the NHS.UK prototype kit!
