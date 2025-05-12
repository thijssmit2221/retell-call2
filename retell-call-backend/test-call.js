import { RetellWebClient } from "retell-client-js-sdk";

// 🔑 Vervang dit door je echte token van create-web-call
const accessToken = "YOUR_ACCESS_TOKEN_FROM_RETELL_API";

const client = new RetellWebClient();

async function runCall() {
  try {
    await client.startCall({
      accessToken,
      sampleRate: 24000,
      emitRawAudioSamples: false,
    });

    client.on("call_started", () => {
      console.log("✅ Call started");
    });

    client.on("call_ended", () => {
      console.log("📞 Call ended");
    });

    client.on("update", (data) => {
      console.log("💬 Transcript update:", data.transcript);
    });

    client.on("error", (err) => {
      console.error("❌ Call error:", err);
      client.stopCall();
    });
  } catch (err) {
    console.error("❌ Failed to start call:", err);
  }
}

runCall();