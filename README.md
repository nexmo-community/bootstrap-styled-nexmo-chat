![Nexmo][logo]

# Styling Chat with Nexmo's Conversation Client SDK and Bootstrap

**Table of Contents**

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
    - [Node & NPM](#node--npm)
    - [Nexmo Account](#nexmo-account)
    - [Nexmo CLI](#nexmo-cli)
  - [Run the Application](#run-the-application)
    - [Basic Installation](#basic-installation)
    - [Create Nexmo Application](#create-nexmo-application)
    - [Create Nexmo Conversation](#create-nexmo-conversation)
    - [Create Your User](#create-your-user)
    - [Add User To Conversation](#add-user-to-conversation)
    - [Generate User Token](#generate-user-token)
    - [Configure The Application](#configure-the-application)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

#### Node & NPM

This application was developed using Node.js 13.1 and NPM 6.12. Check you have stable or long-term support versions of Node.js installed, at least.

```bash
node --version
```

```bash
npm --version
```

If you don't have Node.js or NPM, or you have older versions, head over to [nodejs.org and install the correct version](https://nodejs.org/en/) if you don't have it.

#### Nexmo Account

[Sign up for a free Nexmo account](https://dashboard.nexmo.com/sign-up).

#### Nexmo CLI

To set up your application, you'll need to install the [Nexmo CLI](https://github.com/Nexmo/nexmo-cli/tree/beta). Install it using NPM in terminal.

```bash
npm install -g nexmo-cli@beta
```

Now, configure the CLI using your API key and secret, found on your [Nexmo account dashboard](https://dashboard.nexmo.com/).

```bash
nexmo setup <your_api_key> <your_api_secret>
```

### Run the Application

The application you're starting with is a chat application built using Bootstrap and the [Nexmo JavaScript Client SDK](https://developer.nexmo.com/client-sdk/overview). It's configurable through editing static files, but launched using [Express.js](https://expressjs.com/), a lightweight Node.js based http server.

#### Basic Installation

Clone the demo application straight from GitHub.

```bash
git clone https://github.com/nexmo-community/nexmo-chat-typeform-magiclinks.git
```

Once cloned, change into the new demo application directory.

```bash
cd nexmo-chat-typeform-magiclinks
```

Install the npm dependencies.

```bash
npm install
```

Start the application the standard way.

```bash
npm start
```

Start the application, but with nodemon instead.

```bash
npm run dev
```

#### Create Nexmo Application

```bash
nexmo app:create "Nexmo RTC Chat" --capabilities=rtc --rtc-event-url=http://example.com --keyfile=private.key
# Application created: 4556dbae-bf...f6e33350d8
# Credentials written to .nexmo-app
# Private Key saved to: private.key
```

#### Create Nexmo Conversation

```bash
nexmo conversation:create display_name="Bootstrap Chat"
# Conversation created: CON-a57b0...11e57f56d
```

#### Create Your User

```bash
nexmo user:create name=<USER_NAME> display_name=<DISPLAY_NAME>
# User created: USR-6eaa4...e36b8a47f
```

#### Add User To Conversation

```bash
nexmo member:add <CONVERSATION_ID> action=join channel='{"type":"app"}' user_id=<USER_ID>
# Member added: MEM-df772...1ad7fa06
```

#### Generate User Token

```bash
nexmo jwt:generate ./private.key sub=<USER_NAME> exp=$(($(date +%s)+86400)) acl='{"paths":{"/*/users/**":{},"/*/conversations/**":{},"/*/sessions/**":{},"/*/devices/**":{},"/*/image/**":{},"/*/media/**":{},"/*/applications/**":{},"/*/push/**":{},"/*/knocking/**":{}}}' application_id=<APPLICATION_ID>
# eyJhbGciOi...XVCJ9.eyJpYXQiOjE1NzM5M...In0.qn7J6...efWBpemaCDC7HtqA
```

#### Configure The Application

Edit the `views/layout.hbs` file and find the JavaScript shown here.

```html
    <script>
      var userName = '';
      var displayName = '';
      var conversationId = '';
      var clientToken = '';
    </script>
```

Edit the config with the values you've generated in the commands above.

```html
    <script>
      var userName = 'luke.oliff@vonage.com';
      var displayName = 'Luke Oliff';
      var conversationId = 'CON-123...y6346';
      var clientToken = 'eyJhbG9.eyJzdWIiO.Sfl5c';
    </script>
```

Now, you can start the application again and start chatting... with yourself... because no one else can log in.

```bash
npm start
```

## Code of Conduct

In the interest of fostering an open and welcoming environment, we strive to make participation in our project and our community a harassment-free experience for everyone. Please check out our [Code of Conduct][coc] in full.

## Contributing 
We :heart: contributions from everyone! Check out the [Contributing Guidelines][contributing] for more information.

[![contributions welcome][contribadge]][issues]

## License

This project is subject to the [MIT License][license]

[logo]: nexmo.png "Nexmo"
[contribadge]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat "Contributions Welcome"

[coc]: CODE_OF_CONDUCT.md "Code of Conduct"
[contributing]: CONTRIBUTING.md "Contributing"
[license]: LICENSE "MIT License"

[issues]: ./../../issues "Issues"
