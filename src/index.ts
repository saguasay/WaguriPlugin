var WAGURI_GIFS = [
  "https://media1.tenor.com/m/t-u0MbTWh7UAAAAC/kaoruko-waguri.gif",
  "https://media1.tenor.com/m/ttJH4ujwboMAAAAC/kaoruko-waguri-kaoruko.gif",
  "https://media1.tenor.com/m/qRT07oUZbDkAAAAC/waguri-kaoruko-kaoruhana.gif",
  "https://media1.tenor.com/m/GyuGoM1OkEMAAAAC/kaoruko-waguri-kaoruko.gif",
  "https://media1.tenor.com/m/3n3Vf_m0kPcAAAAC/kaoruko-waguri-waguri-kaoruko.gif",
];

function getRandomGif() {
  return WAGURI_GIFS[Math.floor(Math.random() * WAGURI_GIFS.length)];
}

var unpatch;

export default {
  onLoad: function() {
    var MessageActions = findByProps("sendMessage", "sendBotMessage");
    unpatch = before("sendMessage", MessageActions, function(args) {
      var message = args[1];
      if (typeof message?.content === "string" && message.content.trim().toLowerCase() === "waguri") {
        message.content = getRandomGif();
      }
    });
  },
  onUnload: function() {
    unpatch?.();
    unpatch = undefined;
  },
};
