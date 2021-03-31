const moment = require('moment')
const API = require('./lib/API')
const fetch = require('node-fetch');
const mime = require('mime-types')
const convertRupiah = require('rupiah-format')

WA_Controller = module.exports

WA_Controller.getMessage = async (client, message,decryptMedia) => {
  try {
    const {chatId,type, body, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg} = message
        const { id, pushname } = sender
        const { name } = chat
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const commands = ['/lifescapereport']
        const cmds = commands.map(x => x + '\\b').join('|')
        // console.log(cmds)
        const cmd = type === 'chat' ? body.match(new RegExp(cmds, 'gi')) : type === 'image' && caption ? caption.match(new RegExp(cmds, 'gi')) : ''
        if (cmd) {
            switch (cmd[0]) {
                case '/lifescapereport':
                    const dataReport = await API.getlifescape();
                    // const test = await API.test();

					console.log(dataReport.timestamp)
                    const text_res = "*VA Payment Daily Monitoring Report*\n" +
                    "*Tgl* : " + dataReport.timestamp.time +
                    "\n\n*VA Payment Total Amount* : " + convertRupiah.convert(dataReport.Today[0].amount) +
                    "\n*Invoice Items Paid Total* : " + dataReport.Today[0].item +
                    "\n\n*Total Percentage for : " + moment().format("MMMM YYYY") + "*" +
                        "\n*Status* : " + dataReport.thismonth[0].status + 
                        "\n*Amount* : " + convertRupiah.convert(dataReport.thismonth[0].amount) +
                        "\n*Persen* : "+ dataReport.thismonth[0].persen + 
                        "\n\n*Status* : " + dataReport.thismonth[1].status +
                        "\n*Amount* : " + convertRupiah.convert(dataReport.thismonth[1].amount) +
                        "\n*Persen* : " + dataReport.thismonth[1].persen + 
                        
                    "\n\n*Total Percentage for : " + moment().subtract(1, 'month').format("MMMM YYYY") + "*" +
                        "\n*Status* : " + dataReport.lastmonth[0].status +
                        "\n*Amount* : " + convertRupiah.convert(dataReport.lastmonth[0].amount) +
                        "\n*Persen* : " + dataReport.lastmonth[0].persen +
                        "\n\n*Status* : " + dataReport.lastmonth[1].status +
                        "\n*Amount* : " + convertRupiah.convert(dataReport.lastmonth[1].amount) +
                        "\n*Persen* : " + dataReport.lastmonth[1].persen ;
                        client.sendText(from, text_res)
                    break
      
        default:
          break;
            }
        }
  } catch (err) {
    console.log(err);
  }
}