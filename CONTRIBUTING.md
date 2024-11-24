# Contributing 

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

When contributing to this repository, please first discuss the change you wish to make via issue before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## General Guidelines

- Before starting to work on something, please open an issue first
- If adding a new feature, write the corresponding test
- Ensure that nothing get broke. You can use the playground for that
- If applicable, update the [documentation](https://github.com/fkhadra/react-toastify-doc)
- Use prettier before committing 😭
- When solving a bug, please provide the steps to reproduce it(codesandbox or stackblitz are our best friends for that)
- Tchill 👌

## Setup

### Pre-requisites

- *Node:* `^18.0.0`
- *Yarn*

### Install

Clone the repository and create a local branch:

```sh
git clone https://github.com/fkhadra/react-toastify.git
cd react-toastify

git checkout -b my-branch
```

Install dependencies:

```sh
pnpm install 
// then
pnpm setup 
```

## Developing

```sh
# launch the playground
pnpm start

# Run tests 💩
pnpm test

# Prettify all the things
pnpm prettier
```

### Playground dir

The playground let you test your changes, it's like the demo of react-toastify. Most of the time you don't need to modify it unless you add new features.

### Src

- [toast:](https://github.com/fkhadra/react-toastify/blob/main/src/core/toast.ts) Contain the exposed api (`toast.success...`).

## License
By contributing, you agree that your contributions will be licensed under its [MIT License](https://github.com/fkhadra/react-toastify/blob/main/LICENSE).
