import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

const WAGURI_GIFS = [
  "https://media1.tenor.com/m/t-u0MbTWh7UAAAAC/kaoruko-waguri.gif",
  "https://media1.tenor.com/m/ttJH4ujwboMAAAAC/kaoruko-waguri-kaoruko.gif",
  "https://media1.tenor.com/m/qRT07oUZbDkAAAAC/waguri-kaoruko-kaoruhana.gif",
  "https://media1.tenor.com/m/GyuGoM1OkEMAAAAC/kaoruko-waguri-kaoruko.gif",
  "https://media1.tenor.com/m/3n3Vf_m0kPcAAAAC/kaoruko-waguri-waguri-kaoruko.gif",
];

function getRandomGif() {
  return WAGURI_GIFS[Math.floor(Math.random() * WAGURI_GIFS.length)];
}

let unpatch;

export default {
  onLoad() {
    const MessageActions = findByProps("sendMessage", "sendBotMessage");
    unpatch = before("sendMessage", MessageActions, (args) => {
      const message = args[1];
      if (typeof message?.content === "string" && message.content.trim().toLowerCase() === "waguri") {
        message.content = getRandomGif();
      }
    });
  },
  onUnload() {
    unpatch?.();
    unpatch = undefined;
  },
};
