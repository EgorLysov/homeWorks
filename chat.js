const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  }
  close(){
      this.emit('close');
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

function webinarOnMessege() {
    console.log('Готовлюсь к ответу');
}
webinarChat.on('message', webinarOnMessege);

vkChat.setMaxListeners(2);

vkChat.on('message', webinarOnMessege);


vkChat.on('close', ()=> console.log('Чат вконтакте закрылся :('));
vkChat.close();

// Отпишем вебинар от messege
setTimeout( ()=> {
    //console.log('Закрываю фейсбук, все внимание — вебинару!');
    webinarChat.removeListener('message', webinarOnMessege);
}, 30000 );