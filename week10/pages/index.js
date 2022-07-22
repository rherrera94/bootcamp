import Link from 'next/link'
import Jobs from 'components/Jobs'
import prisma from 'lib/prisma'
import { useRouter } from 'next/router'
import { getJobs, getUser } from 'lib/data.js'
import { useSession, getSession } from 'next-auth/react'

export default function Home({ jobs,user }) {
  const router = useRouter()
  const { data: session, status } = useSession()


  if (session && !session.user.name) {
    router.push('/setup')
  }
  
  return(
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>
      {!session && (
    <a className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
        href='/api/auth/signin'>
      login
    </a>
  )}
  {session && (
    <>
      <p className='mb-10 text-2xl font-normal'>
        Welcome, {user.name}
        {user.company && (
          <span className='bg-black text-white uppercase text-sm p-2'>
            Company
          </span>
        )}
      </p>
      
      {user.company ? (
        <>
          <Link href={`/new`}>
            <button
            className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>
	            click here to post a new job
	          </button>
          </Link>
          <button
          className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>
            see all the jobs you posted
          </button>
        </>
      ) : (
        <>
          <button
          className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>
            see all the jobs you applied to
          </button>
        </>
      )}
    </>
  )}
  <Jobs jobs={jobs} />
  </div>
  )
  /*return (
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>
      {!session && (
    <a className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
        href='/api/auth/signin'>
      login
    </a>
  )}
      <Jobs jobs={jobs} />
    </div>
  )*/
}

export async function getServerSideProps(context) {
  const session = await getSession(context)//devuelve los parametros de la sesion
  let jobs = await getJobs(prisma)
	jobs = JSON.parse(JSON.stringify(jobs))
  /**
   * La idea es que si no esta habilitada la sesión me devuelva solo los
   * trabajos.
   */
  if (!session) {
    return {
      props: { jobs },
    }
  }
  /**
   * Ahora si hay una sesion habilitada me debe devolver no solo los trabajos
   * que se ofertan sino también el usuario que se encuentra logeado
   */
  let user = await getUser(session.user.id, prisma)
  user = JSON.parse(JSON.stringify(user))
  return {
    props: {
      jobs,
      user,
    },
  }
}