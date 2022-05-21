import prisma from 'lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // if the method is GET then find the expenses
    const expenses = await prisma.expense.findUnique({
        where: {
          id: parseInt(req.query.id),
        },
      })
    if (!expenses){
        //if the expenses is not found then
        return res.status(404).json({ message: 'Not Found' })
    }
    //else
    res.status(200).json(expenses);   
  }
  res.status(405).json({ message: 'Method Not Allowed' })
}