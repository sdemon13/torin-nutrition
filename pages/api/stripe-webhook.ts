import type { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'
import { buffer } from 'micro' // нужно для raw body
import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature'] as string
    try {
      const event = stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET! // из Dashboard
      )

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId // можно записывать userId в metadata при создании сессии
        // ... активировать пользователя в Firestore ...
        if (userId) {
          await updateDoc(doc(db, 'users', userId), { isActivated: true })
        }
      }

      res.status(200).send('ok')
    } catch (err) {
      console.error('Webhook Error:', err)
      return res.status(400).send(`Webhook Error: ${err}`)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
