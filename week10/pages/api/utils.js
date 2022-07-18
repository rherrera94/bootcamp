import prisma from 'lib/prisma'
import { faker } from '@faker-js/faker'

const generateFakeJob = (user) => ({
  title: faker.company.catchPhrase(),
  description: faker.lorem.paragraphs(),
  author: {
    connect: { id: user.id },
  },
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.end()

  if (req.body.task === 'clean_database') {
    //elimina todo lo que hay en la base de datos tanto de trabajos como de usuarios
    await prisma.job.deleteMany({})
    await prisma.user.deleteMany({})
  }
  if (req.body.task === 'generate_one_job') {
    //busco todos los usuarios que hay en la bbdd que pertenezcan a una compañia
    //esto lo necesito ya que es el unico perfil de usuario designado para crear empleos
    const users = await prisma.user.findMany({
        where: {
          company: true,
        },
      })
    /*creo un trabajo y se lo asigno a un usuario random en este caso el 0
    await prisma.job.create({
        data: {
            title: 'a job title',
            description: 'a job description',
        author: {
            connect: { id: users[0].id }
        }
        }
    })*/
    // tendra la estructura que se establece en generateFakeJob
    await prisma.job.create({
        data: generateFakeJob(users[0]),
    })
  }
    if (req.body.task === 'generate_users_and_jobs') {
        //ojo aca se usa de la libreria faker la parte de internet que permite generar
        // usuarios y mails random.. la idea es poner algunos casos de prueba para probar la funcionalidad
        let count = 0

        while (count < 10) {
            await prisma.user.create({
                data: {
                name: faker.internet.userName().toLowerCase(),
                email: faker.internet.email().toLowerCase(),
                company: faker.datatype.boolean(),
                },
            })
            count++
        }
        const users = await prisma.user.findMany({
            where: {
              company: true,
            },
          })
        users.forEach(async (user) => {
            await prisma.job.create({
              data: generateFakeJob(user),
            })
          })
    }
  res.end()
}