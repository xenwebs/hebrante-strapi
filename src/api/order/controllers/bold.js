import crypto from "crypto"

// 🔑 SECRET KEY из Bold dashboard
const BOLD_SECRET = "QoL3CUGNRj7VfyZ-PIZbSw"

export default {
  async generateSignature(ctx) {
    try {
      const { orderId, amount, currency } = ctx.request.body

      console.log("📝 Данные для хеша:", { orderId, amount, currency })

      // ТОЧНЫЙ порядок как в документации Bold:
      // {orderId}{amount}{currency}{secretKey}
      const dataToSign = `${orderId}${amount}${currency}${BOLD_SECRET}`
      
      console.log("🔐 Строка для хеша:", dataToSign)

      // Генерируй SHA256 хеш
      const integritySignature = crypto
        .createHmac("sha256", BOLD_SECRET)
        .update(dataToSign)
        .digest("hex")

      console.log("✅ Сгенерированный хеш:", integritySignature)

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