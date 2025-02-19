// pages/api/checkout.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, price } = req.body

      // Создаём Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: { name: 'TorinNutrition Access' },
              unit_amount: price * 100, // 1€ -> 100 cents
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?userId=${userId}`,
      })

      return res.status(200).json({ url: session.url })
    } catch (error: any) {
      console.error('Stripe checkout error:', error)
      res.status(500).json({ error: 'Ошибка при создании Checkout Session' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
