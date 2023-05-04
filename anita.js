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
// CONSTANTES SETTING //

var prefix = '.' //prefijo
var NombreBot = 'anita Bot' // nombre del bot 
var Creador = "Juls Modders & clovers Mods" // No cambiar

// BANNER //

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
      if(args.length<1 ) return 
      enviar('👀✍ESCRIBA 1 PARA ACTIVAR Y 0 PARA DESACTIVAR')
      if(!isGroupAdmins) return enviar ('✨😎𝕝𝕠 𝕤𝕚𝕖𝕟𝕥𝕠 𝕞𝕚 𝕜𝕚𝕟𝕘 , 𝕟𝕠 𝕖𝕣𝕖𝕤 𝕦𝕟 𝕒𝕕𝕞𝕚𝕟𝕚𝕤𝕥𝕣𝕒𝕕𝕠𝕣 𝕕𝕖 𝕝𝕠𝕤 𝔾𝕆𝔻𝕊😎✨')
      if(!isBotGroupAdmins) return enviar(respuesta.botadmin)
      if(Number(args[0])==1) {
        if(iswelkom) return enviar('𝕄𝕀 𝕂𝕀ℕ𝔾 , 𝕐𝔸 𝔼𝕊𝕋𝔸 𝔸ℂ𝕋𝕀𝕍𝕆')
        welkom.push(from)
        fs.writeFileSync('./archivos/welkom.json',JSON.stringify(welkom))
        enviar('𝔸ℂ𝕋𝕀𝕍𝔸𝔻𝕆 ℂ𝕆ℝℝ𝔼ℂ𝕋𝔸𝕄𝔼ℕ𝕋𝔼')
      } else if (Number(args[0]==0)) {
        if(!iswelkom) return enviar('ℕ𝕆 𝔼𝕊𝕋𝔸 𝔸ℂ𝕋𝕀𝕍𝔸𝔻𝕆')
        const elsy = from 
        const proceso = welkom.indexOF(elsy)
        while(proceso>=0) {
          welkom.splice(proceso, 1)
          proceso = welkom.indexOF(elsy)
        }
        fs.writeFileSync('./archivos/welkom.json',Json.stringify(welkom))
        enviar('𝔻𝔼𝕊𝔸ℂ𝕋𝕀𝕍𝔸𝔻𝕆 ℂ𝕆ℝℝ𝔼ℂ𝕋𝔸𝕄𝔼ℕ𝕋𝔼')
      } else {
        enviar('1 para activar y 0 para desactivar')
      }
      break
// ESCRIBIR AQUI COMANDOS CON PREFIJO


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