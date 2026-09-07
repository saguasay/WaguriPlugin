(function() {
    var patches = [];
    return {
        onLoad: function() {
            var MessageActions = vendetta.metro.findByProps("sendMessage", "sendBotMessage");
            var gifs = [
                "https://tenor.com/view/kaoruko-waguri-kaoruko-waguri-gif-13173670899908374147",
                "https://tenor.com/view/kaoruko-waguri-gif-13252884454048171957",
                "https://tenor.com/view/waguri-kaoruko-kaoru-hana-wa-rin-to-saku-tsumugi-rintaro-the-fragrant-flower-blooms-with-dignity-romance-gif-12499339313470873120",
                "https://tenor.com/view/kaoruko-waguri-kaoruko-waguri-kaoruko-kaoru-hana-wa-rin-to-saku-the-fragrant-flower-blooms-with-dignity-gif-1957806488219979843",
                "https://tenor.com/view/kaoruko-waguri-waguri-kaoruko-waguri-kaoruko-the-fragrant-flower-blooms-with-dignity-gif-15354150208404686117"
            ];
            patches.push(vendetta.patcher.before("sendMessage", MessageActions, function(args) {
                var message = args[1];
                if (typeof message?.content === "string" && message.content.trim().toLowerCase() === "waguri") {
                    var randomGif = gifs[Math.floor(Math.random() * gifs.length)];
                    message.content = randomGif;
                }
            }));
        },
        onUnload: function() {
            for (var i = 0; i < patches.length; i++) patches[i]();
            patches = [];
        }
    };
})()
