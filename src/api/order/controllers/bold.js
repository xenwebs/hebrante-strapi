import crypto from "crypto"

// 🔑 ТВОЙ SECRET KEY (получи из Bold dashboard!)
const BOLD_SECRET = "QoL3CUGNRj7VfyZ-PIZbSw"

export default {
  async generateSignature(ctx) {
    try {
      const { orderId, amount, currency } = ctx.request.body

      // Concatenate: {orderId}{amount}{currency}{secretKey}
      const dataToSign = `${orderId}${amount}${currency}${BOLD_SECRET}`

      // Generate SHA256 hash
      const integritySignature = crypto
        .createHmac("sha256", BOLD_SECRET)
        .update(dataToSign)
        .digest("hex")

      console.log("✅ Signature:", integritySignature)

      ctx.body = {
        success: true,
        integritySignature: integritySignature,
        buttonConfig: {
          apiKey: "pk_test_YOUR_KEY",  // Public Key
          orderId: orderId,
          amount: amount.toString(),
          currency: currency,
          integritySignature: integritySignature,
          redirectionUrl: `${ctx.request.origin}/pages/order-confirmation.html?order_id=${orderId}`,
          description: `Pedido #${orderId}`
        }
      }

    } catch (error) {
      console.error("❌ Error:", error)
      ctx.throw(500, error.message)
    }
  }
}