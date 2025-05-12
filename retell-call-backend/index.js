import { RetellWebClient } from "retell-client-js-sdk";

let client = null;

const log = (message) => {
  const logBox = document.getElementById("log");
  logBox.textContent += message + "\n";
  logBox.scrollTop = logBox.scrollHeight;
};

window.startCall = async () => {
  const token = document.getElementById("token").value.trim();

  if (!token) {
    log("⚠️ Please enter a valid access token.");
    return;
  }

  try {
    log("🔄 Starting call...");
    client = new RetellWebClient();

    client.on("call_started", () => log("✅ Call started"));
    client.on("call_ended", () => log("📞 Call ended"));
    client.on("agent_start_talking", () => log("🗣️ Agent started talking"));
    client.on("agent_stop_talking", () => log("🤐 Agent stopped talking"));
    client.on("update", (update) => log("📝 Update: " + JSON.stringify(update)));
    client.on("error", (err) => log("❌ Error: " + err.message));

    await client.startCall({
      accessToken: token,
      sampleRate: 24000,
      emitRawAudioSamples: false,
    });
  } catch (e) {
    log("❌ Error starting call: " + e.message);
  }
};

window.stopCall = () => {
  if (client) {
    client.stopCall();
    log("🛑 Call stopped");
    client = null;
  }
};
