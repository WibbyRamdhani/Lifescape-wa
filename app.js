const {
  create,
  decryptMedia
} = require('@open-wa/wa-automate');
const fs = require('fs-extra')
const moment = require('moment')
const mime = require('mime-types')
const request = require('request')
const WA_Controller = require('./lifescape')

const serverOption = {
  sessionId: "BOT_lifescape",
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  logConsole: false,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
  chromiumArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
}

const opsys = process.platform;
if (opsys == "win32" || opsys == "win64") {
  serverOption['executablePath'] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
} else if (opsys == "linux") {
  serverOption['browserRevision'] = '737027';
} else if (opsys == "darwin") {
  serverOption['executablePath'] = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}

const start = async (client) => {
   client.onMessage((message) => {
     WA_Controller.getMessage(client,message,decryptMedia)
   })
}

create(serverOption).then(async client => await start(client))
  .catch(e => {
    console.log('Error', e.message);
  });