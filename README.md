# ToolAi

A highly customizable AI-powered automation tool using flowchart methodology

## Demo of the App

<img src="tool-ai.gif" width="1000">

## Installation

### NX Monorepo

The repository is built with [NX Monorepo](https://nx.dev/). In order to run the app locally, you need to install `NX` globally and run `NX commands` or install the VS Code extension [NX Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) and serve the app from there.

### Understand the NX workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

### Firebase

This app uses `Firebase authentication` and `Firestore Database`. In order to run the app locally, you need to create a `Firebase` project and link your credentials to your workspace. [Check the documentation](https://firebase.google.com/) in order to setup your `Firebase` project.

### Environment Variables

In order to authenticate for cloud services, you will need to specify API keys that associate with your account. We used services from Firebase and OpenAI.
Your `.env` file should be in your root folder and will have to look like this:

| ENVIRONMENT VARIABLE   | VALUE                    |
| ---------------------- | ------------------------ |
| NX_FIREBASE_KEY        | your_firebase_auth_key   |
| NX_FIREBASE_DOMAIN     | your_firebase_domain     |
| NX_FIREBASE_PROJECT_ID | your_firebase_project_id |
| NX_FIREBASE_SENDER_ID  | your_firebase_sender_id  |
| NX_FIREBASE_APP_ID     | your_firebase_app_id     |
| NX_OPENAI_API_KEY      | your_openai_api_key      |

Note that because we are developing in an NX environment, which is why we will have to follow [NX's guidelines](https://nx.dev/recipes/environment-variables/define-environment-variables) on how it reads environment variables.

## Serve the app locally

### Development server

Run `nx serve toolai` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

### Live Collaboration

To enable live collaboration, run `npm run start-socket` to start a websocket connection. You will be able to simultaneously collaborate with multiple users that share the same board.

## API Reference

### React Flow

[Check out the documentation](https://reactflow.dev/)

### AI tools

- [ChatGPT](https://openai.com/blog/chatgpt)
- [Dall-E](https://openai.com/product/dall-e-2)
- [DeepL](https://www.deepl.com/docs-api)

### Functional Flow Components

These Nodes are built to fulfill fundamental tasks that deal with data flows and user input:

- JSON reader
- File Input
- User Functions
- Template
- Text Input
- Preview
- Download

## Authors

- [Aina Perez Serra](https://github.com/ainaperez)
- [Tarik Azale](https://github.com/Deftool66)
- [Theron Burger](https://github.com/theronburger)
- [Julien Look](https://www.github.com/juice1000)
