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
  //en este caso el company_id no tiene el parseint ya que es un string
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
/**
 * Función que me devolverá el usuario solicitado según su id
 * @param {*} id id de usuario a encontrar
 * @param {*} prisma 
 * @returns devuelve el usuario que busco si es que se encuentra
 */
export const getUser = async (id, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return user
}
/**
 * Los usuarios pueden necesitar para el dashboard mostrar en un sector
 * los trabajos que esten publicados en el momento y los que no lo estan
 * por lo que se hace necesario tener una busqueda que no solo pida los avisos
 * activos sino tambien los demas
 * @param {*} user_id La empresa que publico los anuncios
 * @param {*} prisma 
 * @returns Array con los anuncios sin distinguir la situacion de publicacion
 */
 export const getJobsPosted = async (user_id, prisma) => {
  const jobs = await prisma.job.findMany({
    where: { authorId: user_id },
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
 * Me devuelve los trabajos a los que me postule. Esta información estará
 * dentro del dashboard del usuario.
 * @param {*} user_id id del usuario
 * @param {*} prisma 
 * @returns todos los trabajos a los que se postulo el usuario
 */
export const getApplications = async (user_id, prisma) => {
  const applications = await prisma.application.findMany({
    where: { authorId: user_id },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
      job: true,
    },
  })

  return applications
}