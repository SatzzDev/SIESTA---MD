const stringSimilarity = require('string-similarity'); // Ensure this is required for string similarity
const commands = [];
const handler = [];
const PREFIX = '^[.,!]';

function Siesta(info, func) {
const infos = {
onlyOwner: info.onlyOwner ?? false,
onlyPrem: info.onlyPrem ?? false,
onlyGroup: info.onlyGroup ?? false,
onlyAdmins: info.onlyAdmins ?? false,
onlyPm: info.onlyPm ?? false,
limit: info.limit ?? false,
glimit: info.glimit ?? false,
desc: info.desc ?? '',
type: info.type ?? 'misc',
function: func
};

if (!info.on && !info.command) {
infos.on = 'message';
infos.fromMe = false;
} else {
if (info.on) {
infos.on = info.on;
if (info.command) {
infos.command = new RegExp(info.command);
}
} else {
infos.command = new RegExp(info.command);
}
}
const existingCommandIndex = commands.findIndex(cmd => cmd.name === infos.name && cmd.command.toString() === infos.command.toString());
if (existingCommandIndex !== -1) {
commands[existingCommandIndex] = infos;
} else {
commands.push(infos);
}

return infos;
}

function Handler(func) {
const infos = {
function: func,
on: 'message',
fromMe: false
};

handler.push(infos);
return infos; 
}

function suggestCommand(command) {
const commandList = commands.map(cmd => cmd.command instanceof RegExp ? cmd.command.source : cmd.command);
const matches = stringSimilarity.findBestMatch(command, commandList);
if (matches.bestMatch.rating > 0.5) {
return `Did you mean: ${matches.bestMatch.target}?`;
}
return null;
}

module.exports = {
Siesta,
commands,
Handler,
handler,
suggestCommand, 
};
