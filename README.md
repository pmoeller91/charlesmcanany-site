## About

This is a recreation of Charles McAnany's site using the [nextplate template](https://github.com/zeon-studio/nextplate/) by [Zeon Studio](https://zeon.studio/). The goal is to recreate all the functionality of Charles' original site in a more modern and accessible way. This site is intended to be deployed on Vercel.

## Getting Started

## Requirements

- Node v20.11.0+

Clone the repo locally, and then install dependencies:

```bash
npm install
```

### Development

To run the application locally with hot-reloading for development, run the following command:

```bash
npm run dev
```

### Build

A production-ready build of the website can be built by running the following command:

```bash
npm run build
```

The static build of the website will be output to the `/out` directory, and is
ready to be hosted.

#### Alternate Base Path

If the website is going to be hosted in a sub-directory of a webserver, the
`BASE_PATH` environment variable can be used to indicate that directory at
build-time.

For example, suppose the site was to be hosted at
`https://charlesmcanany.com/new-site/` instead of `https://charlesmcanany.com/`.
To do this, the following command can be used:

```bash
BASE_PATH="new-site/" npm run build
```

The generated files should now work as normal when placed into the corresponding
web-server folder.

<!-- licence -->

## License

### Code

**Code License:** Released under the [MIT](LICENSE) license.

Copyright (c) 2023 - Present, Template Designed & Developed by [Zeon Studio](https://zeon.studio/)
Copyright (c) 2024, Patrick Moeller, Modified & adapted

### Photos

**Photo License:** Photos released under the [CC-BY-NC-SA 4.0](LICENSES/CC-BY-NC-SA-4.0.txt) license.

Copyright (c) 2012, 2015 Charles McAnany
