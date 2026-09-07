var plugin = {};
plugin.default = {
    start: function() {
        var _this = this;
        _this._patches = [];
        var MessageActions = vendetta.metro.findByProps("sendMessage", "sendBotMessage");
        _this._patches.push(vendetta.patcher.before("sendMessage", MessageActions, function(args) {
            var message = args[1];
            if (typeof message?.content === "string" && message.content.trim().toLowerCase() === "waguri") {
                var gifs = [
                    "https://media1.tenor.com/m/t-u0MbTWh7UAAAAC/kaoruko-waguri.gif",
                    "https://media1.tenor.com/m/ttJH4ujwboMAAAAC/kaoruko-waguri-kaoruko.gif",
                    "https://media1.tenor.com/m/qRT07oUZbDkAAAAC/waguri-kaoruko-kaoruhana.gif",
                    "https://media1.tenor.com/m/GyuGoM1OkEMAAAAC/kaoruko-waguri-kaoruko.gif",
                    "https://media1.tenor.com/m/3n3Vf_m0kPcAAAAC/kaoruko-waguri-waguri-kaoruko.gif"
                ];
                message.content = gifs[Math.floor(Math.random() * gifs.length)];
            }
        }));
    },
    stop: function() {
        if (this._patches) {
            this._patches.forEach(function(p) { p(); });
            this._patches = [];
        }
    }
};
