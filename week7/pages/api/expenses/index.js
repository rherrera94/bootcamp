import prisma from 'lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { trip, name, date, amount, currency } = req.body
    // Se controla que los datos que se solicitan vengan acompañados
    if (!trip) {
      return res
        .status(400)
        .json({ message: 'Missing required parameter `trip`' })
    }
    if (!name) {
      return res
        .status(400)
        .json({ message: 'Missing required parameter `name`' })
    }
    if (!amount) {
      return res
        .status(400)
        .json({ message: 'Missing required parameter `amount`' })
    }
    if (!currency) {
      return res
        .status(400)
        .json({ message: 'Missing required parameter `currency`' })
    }

    // esto que sigue vendria a ser el insert, que en prisma es create
    await prisma.expense.create({
      data: {
        trip,
        name,
        date,
        amount,
        currency,
      },
    })

    return res.status(200).end()
  }

  res.status(405).json({ message: 'Method Not Allowed' })
}