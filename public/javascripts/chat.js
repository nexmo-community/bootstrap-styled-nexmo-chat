class ChatApp {
  constructor() {
    this.messageTextarea = document.getElementById('messageTextarea');
    this.sendButton = document.getElementById('send');
    this.messages = document.getElementById('messages');
    this.messageFeed = document.getElementById('messageFeed');

    this.authenticateUser();
  }

  authenticateUser() {
    this.joinConversation({
      name: userName,
      display_name: displayName,
      conversation_id: conversationId,
      client_token: clientToken
    });
  }

  joinConversation(user) {
    var { client_token, conversation_id } = user;

    new NexmoClient({ debug: true })
      .login(client_token)
      .then(app => {
        console.log('*** Logged into app', app);
        return app.getConversation(conversation_id);
      })
      .then((conversation) => {
        console.log('*** Joined conversation', conversation);
        this.setupConversationEvents(conversation, user);
        this.setupUserEvents();
      })
      .catch(this.errorLogger);
  }

  setupConversationEvents(conversation, user) {
    this.conversation = conversation;

    conversation.on('text', (sender, message) => {
      console.log('*** Message received', sender, message)
      this.messageFeed.innerHTML = this.messageFeed.innerHTML + this.senderMessage(user, sender, message);
    })

    conversation.on("member:joined", (member, event) => {
      console.log(`*** ${member.user.name} joined the conversation`)
      this.messageFeed.innerHTML = this.messageFeed.innerHTML + this.memberJoined(member, event);
    })

    this.showConversationHistory(conversation, user)
  }

  showConversationHistory(conversation, user) {
    conversation
      .getEvents({ page_size: 20, order: 'desc' })
      .then((events_page) => {
        var eventsHistory = "";

        events_page.items.forEach((value, key) => {
          if (conversation.members.get(value.from)) {
            switch (value.type) {
              case 'text':
                eventsHistory = this.senderMessage(user, conversation.members.get(value.from), value) + eventsHistory
                break;
              case 'member:joined':
                eventsHistory = this.memberJoined(conversation.members.get(value.from), value) + eventsHistory
                break;
            }
          }
        })

        this.messageFeed.innerHTML = eventsHistory + this.messageFeed.innerHTML
      })
      .catch(this.errorLogger)
  }

  setupUserEvents() {
    this.sendButton.addEventListener('click', () => {
      this.conversation.sendText(this.messageTextarea.value)
        .then(() => {
            this.eventLogger('text')();
            this.messageTextarea.value = '';
        })
        .catch(this.errorLogger);
    })
  }

  errorLogger(error) {
    console.log(error)
  }

  eventLogger(event) {
    return () => {
      console.log("'%s' event was sent", event)
    }
  }

  memberJoined(member, event) {
    const date = new Date(Date.parse(event.timestamp))

    return `<li class="my-2 text-center">` +
    `<p>${member.display_name} joined the conversation <small>@ ${date.toLocaleString('en-GB')}</small></p>` +
    `</li>`;
  }

  senderMessage(user, sender, message) {
    const date = new Date(Date.parse(message.timestamp))
    var output = '';

    if (user.name === sender.user.name) {
      output = `<li class="media my-3">` +
      `<div class="media-body">` +
      `<h5 class="mt-0 mb-1">${sender.display_name} <small>@ ${date.toLocaleString('en-GB')}</small></h5>` +
      message.body.text +
      `</div>` +
      `</li>`;
    } else {
      output = `<li class="media my-3">` +
      `<div class="media-body text-right">` +
      `<h5 class="mt-0 mb-1">${sender.display_name} <small>@ ${date.toLocaleString('en-GB')}</small></h5>` +
      message.body.text +
      `</div>` +
      `</li>`;
    }

    return output;
  }
}

new ChatApp();