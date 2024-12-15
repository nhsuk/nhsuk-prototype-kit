# NHS prototype kit

Visit the <a href="https://prototype-kit.service-manual.nhs.uk">NHS prototype kit site</a> to download the latest version and read the documentation.

## About the NHS prototype kit

The NHS prototype kit enables you to make interactive prototypes that will look like pages on NHS.UK. The prototypes you make are a great way to show ideas to others and for conducting user research.

## Security

If you publish your prototypes online, they must be protected by a <a href="https://prototype-kit.service-manual.nhs.uk/how-tos/publish-your-prototype-online">username and password</a>. This is to prevent members of the public finding prototypes and thinking they are real services.

You must protect user privacy at all times, even when using prototypes. Prototypes made with the kit look like NHS.UK, but do not have the same security provisions. Always make sure you are handling user data appropriately.

## Installation instructions

- <a href="https://prototype-kit.service-manual.nhs.uk/install/simple">Install guide (non technical)</a>
- <a href="https://prototype-kit.service-manual.nhs.uk/install/advanced">Developer friendly install guide (technical)</a>

### Running the kit

Start the kit with `npm run watch`.

## Contribute

If you want to contribute to the NHS prototype kit, by reporting bugs, fixing bugs, suggesting new features or writing documentation, then read our [contributing guidelines](CONTRIBUTING.md).

## Development environment

Before running Gitpod, you must <a href="https://github.com/apps/gitpod-io/installations/new">install the Gitpod.io application on your GitHub account</a>.

Gitpod also requires access to public repositories. Enable this via <a href="https://gitpod.io/integrations">Gitpod integrations</a>. (Click on the 3 dots to edit permissions for your GitHub account. Gitpod may pre-select permissions. You need read/write access to code in the repos.)

Using your own GitHub credentials you can create, change, commit and push to branches on our Gitpod container via the "ready to code" button below.

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/nhsuk/nhsuk-prototype-kit)

Read an <a href="https://www.gitpod.io/docs">introduction to Gitpod (on Gitpod's website)</a>.

## Release lifecycle

> The below is only for maintainers of the prototype kit source code - these instructions aren't relevant if you're building your own prototype using the kit.

### Testing

Run unit tests locally with `npm run test`.

### Making changes

- Merge required changes via pull requests into `main` branch. As you do so, document changes in the `CHANGELOG.md` under an 'Unreleased' header at the top.

### Releasing

- Open a new pull request which changes the version number in `package.json` and `package-lock.json` and which updates the 'Unreleased' header in the `CHANGELOG.md` to the new version number and release date. Merge this into `main`.
- Visit the [Create a new release page](https://github.com/nhsuk/nhsuk-prototype-kit/releases/new) on GitHub. In the 'Choose a tag' dropdown, create a new tag for the new version number, prefixed with a `v`. Use the same format for the release title. You can use the 'Generate release notes' feature to generate some initial release notes, and then edit these as needed. Make sure the "Set as latest release" checkbox is checked. Publish the release (or save as draft if you’re not ready).
- Update the `prototypeKitVersion` value in [the `package.json` of the prototype kit website](https://github.com/nhsuk/nhsuk.service-manual.prototype-kit.docs/blob/main/package.json#L4) - this will update the 'Download' link to point to the new zip file.
- Add some details about the new release to the [What’s new page](https://github.com/nhsuk/nhsuk.service-manual.prototype-kit.docs/blob/main/app/views/whats-new/updates.html) on the prototype kit website
- Announce the new release on the Service Manual Slack, NHS England Slack, and any other appropriate locations

### Code Analysis

Code analysis results can be found in [SonarQube](https://sonar.nhswebsite.nhs.uk/dashboard?id=nhsuk-prototype-kit).

## Support

The NHS prototype kit is maintained by NHS England. [Email us](mailto:service-manual@nhs.net), open a [Github issue](https://github.com/nhsuk/nhsuk-prototype-kit/issues/new) or get in touch on the [NHS digital service manual Slack workspace](https://join.slack.com/t/nhs-service-manual/shared_invite/enQtNTIyOTEyNjU3NDkyLTk4NDQ3YzkwYzk1Njk5YjAxYTI5YTVkZmUxMGQ0ZjA3NjMyM2ZkNjBlMWMxODVjZjYzNzg1ZmU4MWY1NmE2YzE).
