String.prototype.toDiscordId = function () {
  return this.replace(/[<@#&!>]/g, '');
}

String.prototype.isPositiveInteger = function () {
  if (isNaN(this) || parseInt(this) != this || parseInt(this) <= 0) return false;
  return true;
}

module.exports.messageObject = function ({ content = null, embed = null, components = [], mention = false } = {}) {
  let obj = {};
  obj.content = content;
  if (embed) obj.embeds = [embed];
  obj.components = components;
  obj.allowedMentions = {
    repliedUser: mention
  }
  return obj;
}