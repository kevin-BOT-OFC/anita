// BASE PARA CREADORES DE BOTS 

// CREDITOS : CLOVERS MODS
// CREDITOS : JULS MODDERS

// CONSTANTES DE NODULES 

const { 
default: WAConnection,
downloadContentFromMessage, 
emitGroupParticipantsUpdate, 
emitGroupUpdate,
generateWAMessageContent, 
generateWAMessage, 
makeInMemoryStore, 
prepareWAMessageMedia, 
MediaType, 
areJidsSameUser, 
WAMessageStatus, 
AuthenticationState, 
GroupMetadata, 
initInMemoryKeyStore,
getContentType, 
MiscMessageGenerationOptions, 
useSingleFileAuthState, 
BufferJSON, 
WAMessageProto, 
MessageOptions, 
WAFlag, WANode,	
WAMetric,	
ChatModification, 
MessageTypeProto, 
WALocationMessage, 
ReconnectMode, 
WAContextInfo, 
proto,	
WAGroupMetadata, 
ProxyAgent,	
waChatKey, 
MimetypeMap, 
MediaPathMap, 
WAContactMessage, 
WAContactsArrayMessage, 
WAGroupInviteMessage, 
WATextMessage, 
WAMessageContent, 
WAMessage, 
BaileysError, 
WA_MESSAGE_STATUS_TYPE, 
MediaConnInfo, 
URL_REGEX, 
WAUrlInfo, 
WA_DEFAULT_EPHEMERAL, 
WAMediaUpload, 
mentionedJid, 
processTime, 
Browser, 
MessageType, 
Presence, 
WA_MESSAGE_STUB_TYPES, 
Mimetype, 
relayWAMessage,	
Browsers, 
GroupSettingChange, 
delay, 
DisconnectReason, 
WASocket, 
getStream, 
WAProto, 
isBaileys, 
AnyMessageContent, 
fetchLatestBaileysVersion 
} = require('@adiwajshing/baileys');

const fs = require('fs');
const P = require('pino');
const yts = require("yt-search");
const cfonts = require("cfonts");
const chalk = require('chalk')
const axios = require('axios');
const speed = require("performance-now");
const { getBuffer, getRandom, getExtension } = require('./archivos/lib/functions.js');
const { fetchJson } = require("./archivos/lib/fetcher")

const { TelegraPh } = require("./archivos/telegraPh.js")
 const {
 tmpdir
} = require("os")

// CONSTANTES SETTING //

var prefix = '.' //prefijo
var NombreBot = 'anita Bot' // nombre del bot 
var Creador = "Juls Modders & clovers Mods" // No cambiar

// BANNER //

const {videoToWebp,imageToWebp,writeExifImg,writeExifVid} = require('./archivos/stickersss.js')

const welkom = JSON.parse(fs.readFileSync('./archivos/welkom.json'))

const color = (text, color) => {
return !color ? chalk.white(text) : chalk.keyword(color)(text)
}
const banner = cfonts.render(('anita|Bot'), {
font : "block",
align: "center",
colors: ["red","white"]
})

// CONEXION DEL BOT

const store = makeInMemoryStore({ logger: P().child({ level: 'debug', stream: 'linhaDoTempo'}) })
const { state, saveState } = useSingleFileAuthState('./cache/anita.json')
async function startJuls() {
const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(`💤..Espera esta Conectando..!!`)
console.log(banner.string)
console.log("..anita Bot..\nListo Capo Conectado Exitosamente..")
const anita = WAConnection({
logger: P({ level: "silent" }),
printQRInTerminal: true,
browser: ['anitaBot', 'JulsM', '1.0.0'],
auth: state
})
anita.ev.on ("creds.update", saveState)
store.bind(anita.ev)
anita.ev.on("chats.set", () => {
console.log("Tem conversas", store.chats.all())
})
anita.ev.on("contacts.set", () => {
console.log("Tem contatos", Object.values(store.contacts))
})
anita.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update
if(connection === "close") {
const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
console.log("😪..Conección inestable..", lastDisconnect.error, "Intentando conectar...", shouldReconnect);
if(shouldReconnect) {
startJuls()
}
} else if(connection === "open") {
console.log("anita Bot funciona correctamente!!!")
} 
})
//*******************************************//

anita.ev.on('group-participants.update', async (anu) => {
  if(!welkom.includes(anu.id)) return 
  try{
    const datosgp = await anita.groupMetadata(anu.id)

    if(anu.action == 'add') {

      const numerodep = anu.participants[0]

      const fotito = fs.readFileSync('./archivos/Bienvenida.jpg')

      const kevin = `
      ╭══════•>✾<•══════╮

          ★¡Hola a todos!★
      
            ¡Bienvenidos! 
      
      ╰══════•>✾<•══════╯
      
      ━━━━━━━ ∙ʚ♡ɞ∙ ━━━━━━━
      ━━━━━━━ ∙ʚ♡ɞ∙ ━━━━━━━

╔══════❀・°・❀══════╗

•Me presento soy anita la BOT de esta hermoso grupo , les doy una cálida bienvenida a todos, de parte de los Admins y de usuarios.

TE SUGIERO LEER LAS REGLAS POR FAVOR 

      ${numerodep}

      `
      anita.sendMessage(anu.id,{image : fotito, caption : kevin})
     }

     if(anu.action == 'remove') {

      const numerodep = anu.participants[0]

      const fotito2 = fs.readFileSync('./archivos/Despedida.jpg')

      const kevin2 = `
     
       ${numerodep}
       Nunca digo adiós a nadie. Nunca dejo que las personas más cercanas a mí se vayan. Me las llevo conmigo donde yo vaya.
     𝕊𝔸𝕃𝕀𝕆 𝔻𝔼𝕃 𝔾ℝ𝕌ℙ𝕆  
    ℂ𝕌𝕀𝔻𝔸𝕋𝔼 𝔻𝕀𝕆𝕊 𝕋𝔼 𝔹𝔼ℕ𝔻𝕀𝔾𝔸
      `
      anita.sendMessage(anu.id,{image : fotito2, caption : kevin2})
    }

 } catch(e) {
  console.log('Error: % s', color("red"))
 }
})

anita.ev.on('messages.upsert', async (m) => {
function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}
  try {
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}
const getExtension = async (type) => {
return await mimetype.extension(type)
 }
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})
//***************[ FUNCIONES ]***************//
const info = m.messages[0]
  if (!info.message) return 
  if (info.key && info.key.remoteJid == 'status@broadcast') return
const type = Object.keys(info.message)[0] == 'senderKeyDistributionMessage' ? Object.keys(info.message)[2] : (Object.keys(info.message)[0] == 'messageContextInfo') ? Object.keys(info.message)[1] : Object.keys(info.message)[0]
const content = JSON.stringify(info.message);
const altpdf = Object.keys(info.message)
global.prefix
const from = info.key.remoteJid
var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : ''
const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
var pes = (type === 'conversation' && info.message.conversation) ? info.message.conversation : (type == 'imageMessage') && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == 'videoMessage') && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == 'extendedTextMessage') && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ''
const isGroup = info.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? info.key.participant : info.key.remoteJid
const groupMetadata = isGroup ? await anita.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const pushname = info.pushName ? info.pushName : ''
const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const botNumber = anita.user.id.split(':')[0]+'@s.whatsapp.net'
const args = body.trim().split(/ +/).slice(1);
const text = args.join(" ")


//OJO SI NO DA BORRALA//

const enviarfiguimg = async (jid, path, quoted, options = {}) => {
  let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
  let buffer
  if (options && (options.packname || options.author)) {
   buffer = await writeExifImg(buff, options)
  } else {
   buffer = await imageToWebp(buff)
  }
  
  await anita.sendMessage(jid, {
   sticker: {
  url: buffer
   }, ...options
  }, {
   quoted
  })
  return buffer
   }
   
   const enviarfiguvid = async (jid, path, quoted, options = {}) => {
  let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
  let buffer
  if (options && (options.packname || options.author)) {
   buffer = await writeExifVid(buff, options)
  } else {
   buffer = await videoToWebp(buff)
  }
  
  await anita.sendMessage(jid, {
   sticker: {
  url: buffer
   }, ...options
  }, {
   quoted
  })
  return buffer
   }
   
   const getFileBuffer1 = async (mediakey, MediaType) => { 
  const stream = await downloadContentFromMessage(mediakey, MediaType)
  
  let buffer = Buffer.from([])
  for await(const chunk of stream) {
  buffer = Buffer.concat([buffer, chunk])
  }
  return buffer
  }





const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null 
const enviar = (text) => {
  anita.sendMessage(from, {text: text}, {quoted: info})
}
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? anita.sendMessage(from, {text: teks.trim(), mentions: memberr}) : anita.sendMessage(from, {text: teks.trim(), mentions: memberr})}

  //isQuoted 
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')
const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
return buffer}
const isGroupAdmins = groupAdmins.includes(sender) || false 
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const iswelkom = isGroup ? welkom.includes(from) : false 
//*******************************************//
q = args.join(" ")
const sendBtext = async (id, text1, desc1, but = [], vr) => {
buttonMessage = { text: text1, footer: desc1, buttons: but, headerType: 1 }
anita.sendMessage(id, buttonMessage, {quoted: vr}) }
const sendBimg = async (id, img1, text1, desc1, but = [], vr) => {
buttonMessage = { image: {url: img1}, caption: text1, footerText: desc1, buttons: but, headerType: 4 }
anita.sendMessage(id, buttonMessage, {quoted: vr}) }
const sendBimgT = async (id, img1, text1, desc1, but = [], vr) => { templateMessage = { image: {url: img1}, caption: text1, footer: desc1, templateButtons: but, }
anita.sendMessage(id, templateMessage, {quoted: vr}) }
const sendGifButao = async (id, gif1, text1, desc1, but = [], vr) => { buttonMessage = { video: {url: gif1}, caption: text1, gifPlayback: true, footerText: desc1, buttons: but, headerType: 4 }
anita.sendMessage(id, buttonMessage, {quoted: vr}) }
//*******************************************//

const enviartexto = (texto) => {
  anita.sendMessage(from,{ text : texto }, {quoted :  live})
}

const enviarimagen = (imagen) => {
  anita.sendMessage(from,{ image : imagen }, {quoted :  live})
}

const enviarimagencap = (imagen,caption) => {
  anita.sendMessage(from,{ image : imagen,caption : caption }, {quoted :  live})
}

const enviarvideos = (videos) => {
  anita.sendMessage(from,{ video : videos }, {quoted :  live})
}

const enviarvideoscap = (videos,caption) => {
  anita.sendMessage(from,{ video : videos, caption : caption }, {quoted :  live})
}

const enviarmusica = (audios) => {
  anita.sendMessage(from,{ audio : audios }, {quoted :  live})
}

const enviarsticker = (Sticker) => {
  anita.sendMessage(from,{ Sticker : Sticker }, {quoted :  live})
}

const enviardocumentos = (documentos) => {
  anita.sendMessage(from,{ document : documentos}, {quoted : live})
}


// VERIFICACIONES 

const live = {key : {participant : '0@s.whatsapp.net'},message: {liveLocationMessage: {}}} 
const imgm = {key : {participant : '0@s.whatsapp.net'},message: {imageMessage: {}}}
const vid = {key : {participant : '0@s.whatsapp.net'},message: {videoMessage: {}}}
const contato = {key : {participant : '0@s.whatsapp.net'},message: {contactMessage:{displayName: `${pushname}`}}}
const doc = {key : {participant : '0@s.whatsapp.net'},message: {documentMessage:{}}}

if(budy == `${prefix}`) {
enviar('🤔👍')}

//=====\\

// RESPUESTAS POR COMANDOS \\
respuesta = {
espere: " ..enviando.. ",
aguarde: "..Espere Porfavor.. ",
dono: ".. Este comando es Privado.. ",
grupos: ".. Este comando es para grupos.. ",
privado: ".. Este comando es para chats.. ",
admin: " ... Este comando es solo para admins..",
botadmin: " .. Este comando funciona si y solo si, el bot es admin ",
error: ".. Error, intente nuevamente.."
}


// MENSAJES EN TERMUX 

 if (!isGroup && isCmd) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'blue')}\n${color('┃', 'blue')} ${color('Número:', 'blue')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'blue')} ${color('Nombre:', 'blue')} ${color(pushname, 'white')}\n${color('┃', 'blue')} ${color('command:', 'blue')} ${color(command)}\n${color('┃', 'blue')} ${color('Palabras:', 'blue')} ${color(budy.length, 'white')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'blue')}`)
 if (!isGroup && !isCmd) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'blue')}\n${color('┃', 'blue')} ${color('Número:', 'blue')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'blue')} ${color('Nombre:', 'blue')} ${color(pushname, 'white')}\n${color('┃', 'blue')} ${color('command:', 'blue')} ${color('No', 'blue')}\n${color('┃', 'blue')} ${color('Palabras:', 'blue')} ${color(budy.length, 'white')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'blue')}`)
 if (isGroup && isGroup) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'blue')}\n${color('┃', 'blue')} ${color('Número:', 'blue')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'blue')} ${color('Nombre:', 'blue')} ${color(pushname, 'white')}\n${color('┃', 'blue')} ${color('command:', 'blue')} ${color(command)}\n${color('┃', 'blue')} ${color('Palabras:', 'blue')} ${color(budy.length, 'white')}\n${color('┃', 'blue')} ${color('Grupo:', 'blue')} ${color(groupName, 'white')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'blue')}`)
 if (!isGroup && isGroup) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'blue')}\n${color('┃', 'blue')} ${color('Número:', 'blue')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'blue')} ${color('Nombre:', 'blue')} ${color(pushname, 'white')}\n${color('┃', 'blue')} ${color('Horário:', 'blue')} ${color(time, 'white')}\n${color('┃', 'blue')} ${color('command:', 'blue')} ${color('Não', 'blue')}\n${color('┃', 'blue')} ${color('Palabras:', 'blue')} ${color(budy.length, 'white')}\n${color('┃', 'blue')} ${color('Grupo:', 'blue')} ${color(groupName, 'white')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'blue')}`)


// CASES creadas por juls y kevin

switch(command){

case 'agregar' :
  case 'add' : 
  case 'añadir' :
    case 'unir' :
      if(args.length<0 ) return 
      enviar('👀✍𝔼𝕤𝕔𝕣𝕚𝕓𝕖 𝕖𝕝 𝕟𝕦𝕞𝕖𝕣𝕠 𝕕𝕖 𝕝𝕒 𝕡𝕖𝕣𝕤𝕠𝕟𝕒 𝕢𝕦𝕖 𝕕𝕖𝕤𝕖𝕒𝕤 𝕒𝕘𝕣𝕖𝕘𝕒𝕣 𝕤𝕠𝕪 𝕦𝕟 𝔹𝕆𝕋 𝕟𝕠 𝕒𝕕𝕚𝕧𝕚𝕟𝕠🔮')
      if(!isGroupAdmins) return enviar ('lo siento mi king , pero no eres un administrador de los GODS')
      if(!isBotGroupAdmins) return enviar(respuesta.botadmin)
      let pepe = info.quoted ? info.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
      await anita.groupParticipantsUpdate(from, [pepe] , 'add')
      break
 
  case 'kit' : 
  case 'ban':
  case 'kill' :
    case 'eliminar' :
      case 'largate' :
      if(args.length<0 ) return 
      enviar('👀✍𝔼𝕤𝕔𝕣𝕚𝕓𝕖 𝕖𝕝 𝕟𝕦𝕞𝕖𝕣𝕠 𝕕𝕖 𝕝𝕒 𝕡𝕖𝕣𝕤𝕠𝕟𝕒 𝕢𝕦𝕖 𝕕𝕖𝕤𝕖𝕒𝕤 𝕖𝕝𝕚𝕞𝕚𝕟𝕒𝕣 𝕤𝕠𝕪 𝕦𝕟 𝔹𝕆𝕋 𝕟𝕠 𝕒𝕕𝕚𝕧𝕚𝕟𝕠🤔🔮')
      if(!isGroupAdmins) return enviar ('✨😎𝕝𝕠 𝕤𝕚𝕖𝕟𝕥𝕠 𝕞𝕚 𝕜𝕚𝕟𝕘 , 𝕟𝕠 𝕖𝕣𝕖𝕤 𝕦𝕟 𝕒𝕕𝕞𝕚𝕟𝕚𝕤𝕥𝕣𝕒𝕕𝕠𝕣 𝕕𝕖 𝕝𝕠𝕤 𝔾𝕆𝔻𝕊😎✨')
      if(!isBotGroupAdmins) return enviar(respuesta.botadmin)
      let pepe2 =  info.quoted ? info.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
      await anita.groupParticipantsUpdate(from, [pepe2] , 'remove')
      break


      case 'welcome' : 
      case 'bienvenida': 
      if(!isGroup) return enviar(respuesta.grupos)
      if(args.length<1 ) return 
      enviar('👀✍ESCRIBA 1 PARA ACTIVAR Y 0 PARA DESACTIVAR')
      if(!isGroupAdmins) return enviar ('✨😎𝕝𝕠 𝕤𝕚𝕖𝕟𝕥𝕠 𝕞𝕚 𝕜𝕚𝕟𝕘 , 𝕟𝕠 𝕖𝕣𝕖𝕤 𝕦𝕟 𝕒𝕕𝕞𝕚𝕟𝕚𝕤𝕥𝕣𝕒𝕕𝕠𝕣 𝕕𝕖 𝕝𝕠𝕤 𝔾𝕆𝔻𝕊😎✨')
      if(!isBotGroupAdmins) return enviar(respuesta.botadmin)
      if(Number(args[0])==1) {
        if(iswelkom) return enviar('𝕄𝕀 𝕂𝕀ℕ𝔾 , 𝕐𝔸 𝔼𝕊𝕋𝔸 𝔸ℂ𝕋𝕀𝕍𝕆')
        welkom.push(from)
        fs.writeFileSync('./archivos/welkom.json',JSON.stringify(welkom)) ; return enviar('𝔸ℂ𝕋𝕀𝕍𝔸𝔻𝕆 ℂ𝕆ℝℝ𝔼ℂ𝕋𝔸𝕄𝔼ℕ𝕋𝔼')
      } else if (Number(args[0]==0)) {
        if(!iswelkom) return enviar('ℕ𝕆 𝔼𝕊𝕋𝔸 𝔸ℂ𝕋𝕀𝕍𝔸𝔻𝕆')
        const elsy = from 
        const processo = welkom.indexOF(elsy)
        while(processo>=0) {
          welkom.splice(processo, 1)
          processo = welkom.indexOF(elsy)
        }
        fs.writeFileSync('./archivos/welkom.json',Json.stringify(welkom))
        enviar('𝔻𝔼𝕊𝔸ℂ𝕋𝕀𝕍𝔸𝔻𝕆 ℂ𝕆ℝℝ𝔼ℂ𝕋𝔸𝕄𝔼ℕ𝕋𝔼')
      } else {
        enviar('1 para activar y 0 para desactivar')
      }
      break

      case 'figu': case "figu2" : case "stickergif":  case "stickergif2":
        if ((isMedia && !info.message.videoMessage || isQuotedImage)) {      
       var stream = await downloadContentFromMessage(info.message.imageMessage || info.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
           var buffer = Buffer.from([])
           for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
           }
           let ran = 'stickers.webp'
           fs.writeFileSync(`./${ran}`, buffer)
            ffmpeg(`./${ran}`)
            .on("error", console.error)
            .on("end", () => {
             exec(`webpmux -set exif ./dados/${ran} -o ./${ran}`, async (error) => {
             
              await enviarfiguimg(from, fs.readFileSync(`./${ran}`), info, {
        packname: '𝕄𝕀ℕ𝕀 𝕁𝕌𝕃𝕊ℂ𝕀𝕋𝕆', author: '𝕁𝕌𝕃𝕊 𝕄𝕆𝔻𝔻𝔼ℝ𝕊'
       })
               
               fs.unlinkSync(`./${ran}`)
                    
              })
             })
          .addOutputOptions([
              "-vcodec", 
             "libwebp", 
             "-vf", 
         "scale=320:320:force_original_aspect_ratio=decrease,fps=15, pad=320:320:(ow-iw)/2:(oh-ih)/2:color=green@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
           ])
          .toFormat('webp')
          .save(`${ran}`)	 
           } else if ((isMedia && info.message.videoMessage.seconds < 11 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
       const encmedia = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage: info.message.videoMessage
       rane = getRandom('.'+ await getExtension(encmedia.mimetype))
       imgbuff = await getFileBuffer(encmedia, 'video')
       fs.writeFileSync(rane, imgbuff)
       const media = rane
       ran = getRandom('.'+media.split('.')[1])
       const upload = await TelegraPh(media)
       await enviarfiguvid(from, util.format(upload), info, {
        packname: '𝕄𝕀ℕ𝕀 𝕁𝕌𝕃𝕊ℂ𝕀𝕋𝕆', author: '𝕁𝕌𝕃𝕊 𝕄𝕆𝔻𝔻𝔼ℝ𝕊'
       }) 
       }
                 break





// ESCRIBIR AQUI COMANDOS CON PREFIJO

case 'hola':
  enviartexto('Que tal en que andas✌😃')
  break

  case 'Como estas':
    case 'como estas':
      case 'bot estas bien?':
        case '¿bot estas bien?':
          enviartexto('si muy bien y tu?')
          break

  case 'foto':
    enviartexto('Lo siento el comando foto esta en Desarrollo')
    break

  case 'waifu': 
  const good = fs.readFileSync('./archivos/fotos/yotsuba.jpg')
  enviarimagen(good)
  break

  case 'waifuleg': 
  const good2 = fs.readFileSync('./archivos/fotos/yotsuba.jpg')
  const desc = 'hola wee'
  enviarimagencap(good2,desc)
  break

  case 'video': 
  const good4 = fs.readFileSync('./archivos/fotos/ranita.mp4')
  const desc2 = 'hola wee'
  enviarvideos(good4,desc2)
  break

  case 'audio': 
  const good6 = fs.readFileSync('./archivos/fotos/uwu.mp3')
  enviarmusica(good6)
  break


  case 'video2': 
  const good5 = fs.readFileSync('./archivos/fotos/ranita.mp4')
  enviarvideos(good5)
  break

  case 'audio2' :
    anita.sendMessage(from,{audio : fs.readFileSync('./archivos/fotos/uwu.mp3'), mimetype: 'audio/mpeg'},
    {quoted : live})
    break

    case 'sticker': 
  const good7 = fs.readFileSync('./archivos/fotos/logo.webp')
  enviarsticker(good7)
  break





  case 'menu' :
    case 'Menu' : 
    case 'Menú' :
      case 'help' : 
      case 'bot' : 
      


      case 'menu': 
  const good3 = fs.readFileSync('./archivos/fotos/menu.jpg')
  

  const kev = `

   usuario: ${pushname}
  
  -----------------
      ✨Menu✨
  ----------------- 
  ${prefix} menu
  ${prefix} fotoleg
  ${prefix} hola
  ${prefix} welcome
  ${prefix} foto
  ${prefix} aleatorio
  ${prefix} audio (aun esta en desarrolo)
  ----------------- 
    ${NombreBot}
  ----------------- 

  `
enviarimagencap(good3,kev)
break

case 'documento':
  const mama = fs.readFileSync('./archivos/fotos/msvcp.zip')
  enviardocumentos(mama)
  break

case 'documento2':
  anita.sendMessage(from,{ document : fs.readFileSync('./archivos/fotos/msvcp.zip') , 
mimetype: 'application/octel-stream'},{quoted : live }) 
break

case 'aleatorio':
  const ale = ['Pasa el pack de una hormiga',
  'Dile a tus amigos que te vas a vivir a EU y mándame una captura de lo que te haya dicho',
  'Grita desde la ventana que quieres mamar y mándame el vídeo','Escribe el nombre de tu crush',
  'Debes de poner el nombre de mi creador en tu estado de WhatsApp, sin dar contexto',
  'Envíame una fotografía tuya',
  'Debes de dibujar en alguna parte de tu cuerpo el nombre de algún integrante del grupo, luego realiza una foto y envíala',
  'Hazte una foto dándole un beso a una Televisión',
  'Mándame una fotografía en ropa interior',
  'Escribe en tu estado de WhatsApp que te gusta comer tierra',
  'Debes de poner la fotografía de un participante del grupo que sea del sexo opuesto al tuyo en tu perfil de WhatsApp durante 3 días 📸📸',
  'Tienes que mandar un audio cantando la canción: Un pato que va cantando alegremente cua cua 🦆',
  "Envía un mensaje a tu ex y dile todavía me gustas", 'Envía un audio diciendo amo a a todos ','Dile a tu crush que la amas y pasa captura al grupo", "Envía un audio cantando', 
  'Envía una foto en la que salgas tu sin taparte la cara ni nada", "Envía un video bailando', 
  'Invita a personas que no conoces a tomarse una selfi contigo y luego envíalo al grupo', 
  "Elija algunos números aleatorios de sus contactos y envíeles un mensaje de texto con el mensaje 'Estoy embarazad@'.", 
  "¡Tome cualquier bebida que esté cerca de usted, luego mézclela con chile y beba!", 
  "Tome un número aleatorio de sus contactos, llámelo y dígale 'te amo' ", 
  "Compre la comida más barata en la cafetería (o compre una botella de agua) y diga entre sollozos a sus compañeros de clase: 'Esta ... es la comida más cara que he comprado)' ", 
  " Compre una botella de coca cola y salpique flores con ella frente a la multitud."," Párese cerca del refrigerador, cierre los ojos, elija alimentos al azar en él, incluso cuando coma, sus ojos deben estar cerrados.", 
  " De pie en medio de la cancha de baloncesto y gritando: 'TE AMO MI PRÍNCIPE / PRINCESA' ", 
  "Presenta tus respetos a alguien de la clase y luego di: 'Estoy a su servicio, Majestad' ", 
  " Caminando aplaudiendo y cantando la canción 'Feliz cumpleaños' de la clase al pasillo.", 
  " Arrodíllate sobre una rodilla y di '¿Cásate conmigo?' la primera persona en entrar a la habitación.", 
  " Haz un tocado absurdo con tejido, sea lo que sea, sigue pidiendo poses frente a la cámara, sigue subiendo", 
  "Dile 'ERES HERMOSA / MUY HERMOSA, NO MIENTES' a la chica que crees que es la más bonita de esta clase.", 
  " Dile a alguien en clase: 'Primero me dijeron que era tu gemelo, nos separamos y luego me sometí a una cirugía plástica. Y esto es lo más serio que he dicho' ", 
  " Tirar el cuaderno de alguien a la basura, frente a sus ojos, diciendo 'Este libro nadie puede entender' ", 
  " ¡Arranca el pelo de tu propia pierna 3 veces!", 
  " Chatea con tus padres, diles que los extrañas con emoticonos tristes.", 
  " Intente buscar en Google cosas aterradoras o ridículas como tripofobia, etc.", 
  " Siéntese relajado en medio de la cancha de baloncesto mientras finge que es una playa para tomar el sol.", 
  " Llena tu boca de agua y tienes que aguantar hasta dos rondas, si te ríes y derramas o bebes, entonces tienes que volver a llenar y agregar una ronda más.", 
  " Salude a la primera persona que entre en esta sala y diga '¡Bienvenido a Quién quiere ser millonario!' ", 
  "Envía un mensaje de texto a tus padres '¡Hola, hermano! ¡Acabo de comprar el último número de la revista Playboy!' ", 
  "Envíales un mensaje de texto a tus padres: 'Mamá, papá, ya sé que soy un niño adoptado del orfanato. No ocultes esto más'.", 
  " Envía tres números aleatorios en tus contactos y escribe 'Me acabo de convertir en modelo de la revista Playboy' ", 
  " ¡Come una cucharada de salsa de soja dulce y salsa de soja!", 
  " Come algo pero no uses las manos.", 
  " Enojarse con sus amigos que no vienen a pesar de que tienen una cita para jugar 'Verdad o Reto' juntos", 
  "¡Rompe el huevo con la cabeza!", 
  "Coma alimentos que se hayan mezclado y tendrán un sabor extraño, pero asegúrese de que los alimentos no sean dañinos para la salud a largo o corto plazo.", 
  "Baila como Girls 'Generation para los niños frente a la clase, o baila como Super Junior para las niñas.", 
  "Izar el asta de la bandera sin la bandera.", 
  "Hablando de la persona que te gusta, de tus amigos más cercanos, del sexo opuesto que no conoces en absoluto y cosas por el estilo.", 
  "Copia los peinados de todos tus amigos.", 
  "Cantando la canción HAI TAYO frente a mucha gente mientras baila", 
  "Cante la canción Baby Shark en voz alta en el aula.", 
  "Pedir prestado algo a los vecinos", 
  "Pide la firma de uno de los profesores más feroces mientras dices 'Eres verdaderamente la persona que más admiro en el mundo' ", 
  " Pídale dinero a alguien (al azar ) en la calle diciendo 'No tengo dinero para tomar un angkot'.", 
  " Beba algo que haya sido preparado / acordado, pero asegúrese de que no sea peligroso, puede ser como beber jarabe mezclado con salsa de soja.", 
  " Hablando con el emoticono-miedo de la persona que te gusta, está bien conversar con lo que quieras, a través de cualquier medio que puedas.", 
  " Canta tu película de Disney favorita fuera de casa mientras gritas.", 
  " Nombra de 1 azul a 20 azules rápidamente y no debes cometer ningún error. Si está mal, debe repetirse desde el principio.", 
  " Póngase una corona de papel de copia y diga a todos en la habitación 'HONOR AL REY' mientras señala a cada persona con una regla.", 
  " Vuelve a ponerte los pantalones hasta la mañana siguiente.", 
  " Abraza a la persona que NO te agrada en clase y di: 'Muchas gracias por ser la mejor persona para mí' ", 
  " Ve a un campo amplio, luego corre lo más rápido posible mientras dices 'Estoy loco, estoy loco' ", 
  " Elija una flor y luego conéctela a alguien que no conoce (debe ser del sexo opuesto)", 
  " Elige a una persona al azar en la calle, luego di 'No sabes que eres hermosa' (ala One Direction)", 
  " Fingir estar poseído ejm: poseído por un tigre, etc.", 
  " Pídale que silbe ya que su boca está nuevamente llena de comida.", 
  " Pide ser un mesero para que te sirva con tus amigos para el almuerzo.", 
  " Dígales que usen calcetines para hacer guantes.", 
  "Dígales que usen el sombrero más extraño / el casco más absurdo durante la próxima ronda.", 
  "Llama a tu mamá y dile 'mamá, quiero casarme lo antes posible' ", 
  "Llama a tu ex y di 'te extraño' ", 
  "Cambia de ropa con la persona más cercana hasta la siguiente ronda.", 
  "Actualice el estado en WhatsApp lo que sea con palabras que comiencen con 'S' ", 
  "Sube un video de canto a YouTube que esté cantando canciones populares.", 
  "Colorea tus uñas de las manos y de los pies de diferentes colores durante una semana.", 
  "come 2 cucharadas de arroz sin guarniciones", 
  "Envie el emoji '🦄💨' cada vez que escriba en un grupo 1 día", 
  "diga '¡Bienvenido a Quién quiere ser millonario!' a todos los grupos que tienes", 
  "canta el coro de la última canción que tocaste", 
  "Envia un audio de voz a tu ex / enamorado / novia, dile hola (nombre), quiero llamar, solo un momento. Te Extraño🥺👉🏼👈🏼 ", 
  "Dile a la gente al azar: Primero me dijeron que era tu gemelo, nos separamos y luego me sometí a una cirugía plástica. Y esto", 
  "¡Haz 1 rima para el primer jugador!", 
  "cuenta tu propia versión de cosas vergonzosas", 
  "cambiar el nombre a 'Gay' durante 24 horas", 
  "¡Menciona tu tipo de novia!", 
  "Di 'Estoy enamorado de ti, ¿quieres ser mi novio o no?' al último sexo opuesto con el que conversaste en WhatsApp, espera a que responda", 
  "Háblale a tu ex por WhatsApp y dile 'te amo, por favor vuelve'. Manda una captura de pantalla como evidencia de reto cumplido!"]
  const ale2 = Math.floor(Math.random()*ale.length)
  const ale3 = ale[ale2]
  enviartexto(ale3)
  break
default:

}

// COMANDOS SIN PREFIJOS

} catch (e) {
console.log(e)
}
fs.watchFile('./anita.js', (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
console.log(color("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\a anita FUE MODICADO\n ..REINICIANDO INDEX..", "blue"));
process.exit()
}
})
})

}
startJuls()