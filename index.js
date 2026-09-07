(function() {
    var patches = [];
    return {
        onLoad: function() {
            var MessageActions = vendetta.metro.findByProps("sendMessage", "sendBotMessage");
            patches.push(vendetta.patcher.before("sendMessage", MessageActions, function(args) {
                var message = args[1];
                if (typeof message?.content === "string" && message.content.trim().toLowerCase() === "waguri") {
                    var gifs = [
                        "https://media1.tenor.com/m/t-u0MbTWh7UAAAAC/kaoruko-waguri.gif",
                        "https://media1.tenor.com/m/ttJH4ujwboMAAAAC/kaoruko-waguri-kaoruko.gif",
                        "https://media1.tenor.com/m/qRT07oUZbDkAAAAC/waguri-kaoruko-kaoruhana.gif",
                        "https://media1.tenor.com/m/GyuGoM1OkEMAAAAC/kaoruko-waguri-kaoruko.gif",
                        "https://media1.tenor.com/m/3n3Vf_m0kPcAAAAC/kaoruko-waguri-waguri-kaoruko.gif"
                    ];
                    var randomGif = gifs[Math.floor(Math.random() * gifs.length)];
                    message.content = "";
                    message.embeds = [{
                        type: "image",
                        image: { url: randomGif }
                    }];
                }
            }));
        },
        onUnload: function() {
            for (var i = 0; i < patches.length; i++) patches[i]();
            patches = [];
        }
    };
})()
