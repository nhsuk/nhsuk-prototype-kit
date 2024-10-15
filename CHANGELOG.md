# NHS.UK prototype kit Changelog

## 5.0.0 - 15 October 2024

:new: **New features**

- Update to NHS.UK frontend v9.0.1 - see [version 9.0.0 release notes](https://github.com/nhsuk/nhsuk-frontend/releases/tag/v9.0.0) for details on the breaking changes
- Drop `outerContent` block and use `beforeContent` block for both breadcrumbs and back links

:wrench: **Fixes**

- Updates to dependencies

## 4.12.0 - 15 August 2024

:wrench:

- Enable console logging for nodemon
- Replace basic auth with a custom authentication process
- Update NHS.UK frontend to [v8.3.0](https://github.com/nhsuk/nhsuk-frontend/releases/tag/v8.3.0)
- Fix setting PORT via the command line ([PR 347](https://github.com/nhsuk/nhsuk-prototype-kit/pull/347))

## 4.11.0 - 27 June 2024

:wrench: **Fixes**

- Disable nunjucks caching so changes to templates show immediately
- Stop watching .html and .scss files and restarting the server whenever they are changed
- Ignore eslint warnings

:pencil2: **Content**

- Update README with start script
- Fix a typo in setup docs
- Update NHS website page template to be closer to live
- Remove Covid banner from 'Health A-Z', 'Live Well', 'Mental Health' and 'Pregnancy' templates

## 4.10.0 - 22 February 2024

:wrench: Fixes

- Add aria-labels to coronavirus hub page and mental health pagenavigation links
- Removed the duplicate selector in '\_related-nav.scss'
- Removed Covid banner from 'Social care and support guide' and 'NHS Services' templates
- Use 'String#startsWith' method instead of getting the index of a substring in utils.js
- Change unexpected var for const in gulpfile.js
- Update 'Social care and support guide' template to use primary cards with chevrons
- Upgrade node version to v20
- Update NHS.UK frontend to [v8.1.0](https://github.com/nhsuk/nhsuk-frontend/releases/tag/v8.1.0), includes updates to header and footer components

## 4.9.0 - 1 June 2023

:pencil2: **Content**

- Fix styling on confirmation page
- Add character count and tab components
- Update guidance on setting a password in 'Publish your prototype online'
- Change references to NHS Digital to NHS England
- Enhance deployment instructions and test note in README
- Fix link in README

:wrench: **Maintenance**

- Install NHS.UK frontend v7.0.0

## 4.8.6 - 24 January 2023

:pencil2: **Content**

- Add new 'Publish your prototype online' guidance
- Replace Atom with Visual Studio Code on HTML text editor page

:wrench: **Maintenance**

- Install NHS.UK frontend v6.2.0

## 4.8.5 - 12 December 2022

:wrench: Fixes

- Update package dependencies `decode-uri-component`and `engine.io`.

:pencil2: **Content**

- Added deployment instructions and test note to readme.

## 4.8.4 - 12 October 2022

:pencil2: **Content**

- Fixed typo in readme

## 4.8.3 - 5 September 2022

:arrow_up: **Version bump**

- Release issues

## 4.8.2 - 5 September 2022

:arrow_up: **Version bump**

## 4.8.1 - 31 August 2022

:pencil2: **Content**

- Removed the 'deploy to Heroku' guidance page in response to [Heroku's upcoming removal of its free tier](https://blog.heroku.com/next-chapter#focus-on-mission-critical)

## 4.8.0 - 2 February 2022

:new: **New features**

- Install NHS.UK frontend v6.1.0 which includes text align utility class

## 4.7.3 - 8 December 2021

:wrench: **Fixes**

- Install NHS.UK frontend v6.0.1
- Update Health A-Z with new Nav A-Z
- Add list-border css to `_list-border.scss`
- Add support for Node 16.x

Node 16.x recently became the long term supported version of Nodejs. The `gulp-sass` dependency had a peer dependency pinned to specific version `node-sass` that doesn't work on Node 16.x. Node 16.x support got added to `node-sass` in `6.0.0` and above

## 4.7.2 - 28 October 2021

:wrench: **Fixes**

- Install NHS.UK frontend v5.2.1
- Update package dependencies to latest versions

## 4.7.1 - 12 October 2021

:wrench: **Fixes**

- Update download link for the prototype-kit to use the latest release instead of the master branch

## 4.7.0 - 22 September 2021

:new: **New features**

- Install latest version of NHS.UK frontend (5.2.0) which includes "None of these" Checkboxes JavaScript behaviour

## 4.6.4 - 25 August 2021

:wrench: **Fixes**

- Add script to fix bug with unchecked checkboxes and separate bug when only one checkbox is selected.
- Update package dependencies to latest versions

## 4.6.3 - 24 August 2021

:wrench: **Fixes**

- Use the correct name for the NHS digital service manual Slack instance
- Fix GitHub actions/Azure DevOps release pipelines [Issue 180](https://github.com/nhsuk/nhsuk-prototype-kit/issues/180)

## 4.6.2 - 24 August 2021

:wrench: **Fixes**

- Correct slack channel links on the `About` page.

## 4.6.1 - 18 August 2021

:wrench: **Fixes**

- Swap outdated `panel` for `card` on `clear-data.html` page.

## 4.6.0 - 16 August 2021

:new: **New features**

- Allow adding of custom styles on a per template basis with `customStyles` template block.

## 4.5.1 - 29 July 2021

:new: **New features**

- Add missing coronavirus hub page example from the NHS website which should have been in the previous release

:wrench: **Fixes**

- Update CSS link colours for the NHS website page examples

## 4.5.0 - 26 July 2021

:new: **New features**

- Add NHS website (www.nhs.uk) page examples (homepage, health a-z, live well, mental health, care and support, pregnancy, NHS services, coronavirus hub) and Google homepage template ([Issue #183](https://github.com/nhsuk/nhsuk-prototype-kit/issues/183))

## 4.4.1 - 26 May 2021

:wrench: **Fixes**

- Add missing steps to 'Updating the kit' how to guide
- Update package dependencies to latest versions

## 4.4.0 - 17 May 2021

:new: **New features**

- Install NHS.UK frontend v5.1.0 which includes JavaScript for the Error summary component

:wrench: **Fixes**

- Update package dependencies to latest versions
- Use `dart-sass` instead of `node-sass` as this module is now deprecated ([NHS.UK frontend issue #731](https://github.com/nhsuk/nhsuk-frontend/pull/731))

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

- [Installation guides update for Windows and Mac following testing with users](https://github.com/nhsuk/nhsuk-prototype-kit/pull/68)
- The prototype kit now is properly versioned and is the version is indicated in `package.json` `version` field and also on the index page of the docs.

:wrench: **Fixes**

- [Header and footer inconsistency on the branching examples](https://github.com/nhsuk/nhsuk-prototype-kit/issues/71)
- Fix inconsistencies with page titles, should be `Page name - NHS.UK prototype kit`

## 1.0.0 - Feb 5, 2019

:tada: **Official release of the NHS.UK prototype kit**

- v1.0.0 of the NHS.UK prototype kit!
