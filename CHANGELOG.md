# NHS.UK prototype kit Changelog

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
