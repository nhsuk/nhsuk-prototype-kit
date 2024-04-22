# NHS.UK prototype kit

Visit the <a href="http://nhsuk-prototype-kit.azurewebsites.net/docs">NHS.UK prototype kit site</a> to download the latest version and read the documentation.

## About the NHS.UK prototype kit

The NHS.UK prototype kit enables you to make interactive prototypes that will look like pages on NHS.UK. The prototypes you make are a great way to show ideas to others and for conducting user research.

## Security

If you publish your prototypes online, they must be protected by a <a href="https://nhsuk-prototype-kit.azurewebsites.net/docs/how-tos/publish-your-prototype-online">username and password</a>. This is to prevent members of the public finding prototypes and thinking they are real services.

You must protect user privacy at all times, even when using prototypes. Prototypes made with the kit look like NHS.UK, but do not have the same security provisions. Always make sure you are handling user data appropriately.

## Installation instructions

- <a href="http://nhsuk-prototype-kit.azurewebsites.net/docs/install/simple">Install guide (non technical)</a>
- <a href="http://nhsuk-prototype-kit.azurewebsites.net/docs/install/advanced">Developer friendly install guide (technical)</a>

### Running the kit

Start the kit with `npm run watch`.

## Contribute

If you want to contribute to the NHS.UK prototype kit, by reporting bugs, fixing bugs, suggesting new features or writing documentation, then read our [contributing guidelines](CONTRIBUTING.md).

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

### Environments

#### Preview environment

Code pushed to the `main` branch will deploy on the [Preview environment](http://nhsuk-prototype-kit-preview.azurewebsites.net/).

#### Live

The live NHS.UK prototype kit [Live environment](https://nhsuk-prototype-kit.azurewebsites.net), accessible to the public.

__Note:__ Live is behind a server side cache which results in changes not appearing immediately.

### Versioning and deploying to live

- Merge required changes via PR into `main` branch
  - Ensure the version number in `package.json` and `CHANGELOG.md` match, with a summary of the changes included in the changelog
- Verify the changes in the [Preview environment](http://nhsuk-prototype-kit-preview.azurewebsites.net/)
- Pull down merged `main` branch to your local repository
- Create a tag with the version number from the latest commit on `main`
  - If the latest version you're looking to push is version "1.2.3", you can do this on the command line with
    - `git tag v1.2.3`
    - `git push --tags`
- [Github actions](https://github.com/nhsuk/nhsuk-prototype-kit/actions/workflows/release.yml) will spring to life and create a release which will be visible on the [releases tab](https://github.com/nhsuk/nhsuk-prototype-kit/releases) of the repository.
- Finally, edit the description of the release to match the content entered into the changelog.
- To deploy the changes to Live, the promotion to Live from the Preview environment must have the appropriate approval in Azure.

### Code Analysis

Code analysis results can be found in [SonarQube](https://sonar.nhswebsite.nhs.uk/dashboard?id=nhsuk-prototype-kit).

## Support

The NHS.UK prototype kit is maintained by NHS England. [Email us](mailto:service-manual@nhs.net), open a [Github issue](https://github.com/nhsuk/nhsuk-prototype-kit/issues/new) or get in touch on the [NHS digital service manual Slack workspace](https://join.slack.com/t/nhs-service-manual/shared_invite/enQtNTIyOTEyNjU3NDkyLTk4NDQ3YzkwYzk1Njk5YjAxYTI5YTVkZmUxMGQ0ZjA3NjMyM2ZkNjBlMWMxODVjZjYzNzg1ZmU4MWY1NmE2YzE).
