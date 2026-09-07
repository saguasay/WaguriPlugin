(function() {
    var patches = [];
    var gifs = [];
    var fallbackGifs = [
        "https://tenor.com/view/kaoruko-waguri-kaoruko-waguri-gif-13173670899908374147",
        "https://tenor.com/view/kaoruko-waguri-gif-13252884454048171957",
        "https://tenor.com/view/waguri-kaoruko-kaoru-hana-wa-rin-to-saku-tsumugi-rintaro-the-fragrant-flower-blooms-with-dignity-romance-gif-12499339313470873120",
        "https://tenor.com/view/kaoruko-waguri-kaoruko-waguri-kaoruko-kaoru-hana-wa-rin-to-saku-the-fragrant-flower-blooms-with-dignity-gif-1957806488219979843",
        "https://tenor.com/view/kaoruko-waguri-waguri-kaoruko-waguri-kaoruko-the-fragrant-flower-blooms-with-dignity-gif-15354150208404686117"
    ];

    function buildTenorViewUrl(id, slug) {
        return "https://tenor.com/view/" + slug + "-gif-" + id;
    }

    function fetchGifs(query) {
        var url = "https://g.tenor.com/v1/search?q=" + encodeURIComponent(query) + "&key=LIVDSRZULELA&limit=50&media_filter=tinygif,gif";
        return fetch(url)
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data && data.results) {
                    for (var i = 0; i < data.results.length; i++) {
                        var r = data.results[i];
                        if (r.media && r.media[0] && r.media[0].gif) {
                            var id = String(r.id);
                            var slug = (r.title || "waguri").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                            gifs.push(buildTenorViewUrl(id, slug));
                        }
                    }
                }
                if (gifs.length === 0) gifs = fallbackGifs.slice();
            })
            .catch(function() { if (gifs.length === 0) gifs = fallbackGifs.slice(); });
    }

    return {
        onLoad: function() {
            var MessageActions = vendetta.metro.findByProps("sendMessage", "sendBotMessage");

            fetchGifs("kaoruko waguri").then(function() {
                return fetchGifs("waguri kaoruko");
            });

            patches.push(vendetta.patcher.before("sendMessage", MessageActions, function(args) {
                try {
                    var message = args[1];
                    if (typeof message?.content === "string" && message.content.trim().toLowerCase() === "waguri") {
                        var allGifs = gifs.length > 0 ? gifs : fallbackGifs;
                        var randomGif = allGifs[Math.floor(Math.random() * allGifs.length)];
                        args[1] = Object.assign({}, message, { content: randomGif });
                    }
                } catch (e) {}
            }));
        },
        onUnload: function() {
            for (var i = 0; i < patches.length; i++) patches[i]();
            patches = [];
        }
    };
})()
