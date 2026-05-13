import crypto from "crypto"

const BOLD_SECRET = "QoL3CUGNRj7VfyZ-PIZbSw"  // ← Твой Secret Key!

export default {
  async generateSignature(ctx) {
    try {
      const { orderId, amount, currency } = ctx.request.body

      console.log("📝 Данные для хеша:", { orderId, amount, currency })

      const dataToSign = `${orderId}${amount}${currency}${BOLD_SECRET}`
      
      console.log("🔐 Строка для хеша:", dataToSign)

      const integritySignature = crypto
        .createHmac("sha256", BOLD_SECRET)
        .update(dataToSign)
        .digest("hex")

      console.log("✅ Хеш:", integritySignature)

      ctx.body = {
        success: true,
        integritySignature: integritySignature
      }

    } catch (error) {
      console.error("❌ Error:", error)
      ctx.throw(500, error.message)
    }
  }
}