/**
 * 
 * @param {*} prisma 
 * @returns todos los trabajos listados con id de manera descendente
 * tienen que estar publicados e incluiran el autor.
 */
export const getJobs = async (prisma) => {
  const jobs = await prisma.job.findMany({
    where: {
      published: true
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  })
  return jobs
}
/**
 * 
 * @param {*} id del trabajo que se busca
 * @param {*} prisma 
 * @returns devuelve un trabajo especifico segun el id que se pasa por parametro
 */
export const getJob = async (id, prisma) => {
  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  })
  return job
}
/**
 * getCompany devolverá la empresa que estoy buscando
 * @param {*} company_id id de la compañia que se intenta buscar 
 * @param {*} prisma 
 * @returns devuelve la compañia buscada
 */
export const getCompany = async (company_id, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id: company_id,
    },
  })
  return user
}
/**
 * getCompanyJobs devolvera un array de todos los empleos publicados por una empresa
 * 
 * @param {*} company_id compañia de la que se desea saber los trabajos que tiene publicados 
 * @param {*} prisma 
 * @returns devuelve los trabajos segun el id que se pasa por parametro
 */
export const getCompanyJobs = async (company_id, prisma) => {
  const jobs = await prisma.job.findMany({
    where: { authorId: company_id, published: true },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  })
  return jobs
}