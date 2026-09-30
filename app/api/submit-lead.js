// Vercel serverless function: forwards booking-form leads to the GoHighLevel
// inbound webhook server-to-server. Used as a same-origin fallback from
// src/pages/Booking.jsx when a direct browser -> GHL request fails (most
// likely a CORS rejection, since GHL's webhook endpoint isn't guaranteed to
// send CORS headers back to a browser fetch).
//
// Reads GHL_WEBHOOK_URL (a server-only env var, never exposed to the client)
// with a fallback to VITE_GHL_WEBHOOK_URL so a single Vercel env var covers
// both the direct and proxied paths if that's all that's configured.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL || process.env.VITE_GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[api/submit-lead] No GHL_WEBHOOK_URL (or VITE_GHL_WEBHOOK_URL) configured in the Vercel project's environment variables.");
    return res.status(500).json({ error: "Lead webhook is not configured." });
  }

  try {
    const ghlResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (ghlResponse.status !== 200 && ghlResponse.status !== 201) {
      const text = await ghlResponse.text().catch(() => "");
      console.error("[api/submit-lead] GHL webhook rejected the lead:", ghlResponse.status, text);
      return res.status(502).json({ error: "Lead service rejected the submission." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[api/submit-lead] Failed to reach GHL webhook:", err);
    return res.status(502).json({ error: "Failed to reach lead service." });
  }
}
