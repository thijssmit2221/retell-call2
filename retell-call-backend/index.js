import { RetellWebClient } from "https://cdn.jsdelivr.net/npm/retell-client-js-sdk/+esm";

let client;

window.startCall = async () => {
  const token = document.getElementById("token").value;
  if (!token) {
    log("❗ Please provide a valid access token.");
    return;
  }

  client = new RetellWebClient();

  try {
    await client.startCall({ accessToken: token });
    log("✅ Call started.");

    client.on("call_started", () => log("📞 Call started"));
    client.on("call_ended", () => log("📴 Call ended"));
    client.on("update", (data) => log("🗣 Transcript: " + data.transcript));
    client.on("agent_start_talking", () => log("🤖 Agent is talking..."));
    client.on("agent_stop_talking", () => log("🛑 Agent stopped talking."));
    client.on("error", (err) => log("❌ Error: " + err.message));
  } catch (err) {
    log("🚫 Failed to start call: " + err.message);
  }
};

window.stopCall = () => {
  if (client) {
    client.stopCall();
    log("⛔ Call manually stopped.");
  } else {
    log("⚠️ No call in progress.");
  }
};

function log(message) {
  const el = document.getElementById("log");
  el.textContent += message + "\n";
  el.scrollTop = el.scrollHeight;
}