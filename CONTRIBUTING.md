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
- When solving a bug, please provide the steps to reproduce it(codesandbox is our best friend for that)
- Tchill 👌

## Setup

### Pre-requisites

- *Node:* `^16.0.0`
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
yarn install 
// then
yarn setup
```

## Developing

How it works ? The library don't use a state management library like redux or mobx to dispatch the notifications. Instead it uses a dead simple pubsub.


```sh
# launch the playground
yarn start

# Run tests 💩
yarn test

# Prettify all the things
yarn prettier
```

### Project structure

#### Scss

All the style rules lives in the `scss` directory. The filename are self-explanatory about their content. 

#### Example dir

The playground let you test your changes, it's like the demo of react-toastify. Most of the time you don't need to modify it unless you add new features.

#### Src

- [toast:](https://github.com/fkhadra/react-toastify/blob/master/src/core/toast.ts) Contain the exposed api (`toast.success...`).

- [eventManager:](https://github.com/fkhadra/react-toastify/blob/master/src/core/eventManager.ts) 
This is the glue between `toast` and `ToastContainer`. In fact, it is just a dead simple pubsub.

## License
By contributing, you agree that your contributions will be licensed under its MIT License.