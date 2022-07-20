
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
/**
 * La manera de llegar aca es que el usuario no tenga configurado su nombre de usuario
 * en la base de datos. Esta página solicitara que se cargue la informacion restante.
 * @returns 
 */
 export default function Setup() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    const [name, setName] = useState('')
    const [company, setCompany] = useState(false)
    if (loading) return null

    if (!session || !session.user) {
      //no se podra ingresar si no estas logeado
      router.push('/')
      return null
    }
  
    if (!loading && session && session.user.name) {
      //la idea es que si el usuario ya lleno la informacion no pueda volver a la pagina de setup
      router.push('/')
    }
    return (
      <form
        className='mt-10 ml-20'
        onSubmit={async (e) => {
          e.preventDefault()
          //al hacer submit le envio a la api el nombre de la persona y si es una compañia
          await fetch('/api/setup', {
            body: JSON.stringify({
              name,
              company,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
          //configuro la informacion del usuario para la sesion
          session.user.name = name
          session.user.company = company
          router.push('/')
        }}
      >
        <div className='flex-1 mb-5'>
          <div className='flex-1 mb-5'>Add your name</div>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border p-1 text-black'
          />
        </div>
  
        <div className='flex-1 mb-5'>
          <div className='flex-1 mb-5'>
            Check this box if you're a company and you want to post jobs
          </div>
          <input
            type='checkbox'
            name='company'
            checked={company}
            onChange={(e) => setCompany(!company)}
            className='border p-1'
          />
        </div>
  
        <button className='border px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover'>
          Save
        </button>
      </form>
    )
  }