import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function NewTweet() {
  //el setContent lo que hara es asignarle un valor a content el cual por defecto sera ''
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const router = useRouter()
  if (!session || !session.user) return null

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault() //hace que no se produzca la accion por defecto que seria recargar la pagina

        if (!content) {
          alert('No content')
          return
        }
        //el fetch este lo que hara es mandar una peticion POST a /api/tweet
        //se necesita poner await para que cada vez que yo ingrese un nuevo tweet me aparezca al toque
        await fetch('/api/tweet', {
          body: JSON.stringify({
            content,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        router.reload(window.location.pathname)
      }}
    >
      <div className='flex'>
        <div className='flex-1 px-1 pt-2 mt-2 mr-1 ml-1'>
          <textarea
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name='content'
            onChange={(e) => setContent(e.target.value)} //cuando el valor de la textarea cambia le establezco a content el valor del textarea
          />
        </div>
      </div>

      <div className='flex'>
        <div className='flex-1 mb-5'>
          <button className='border float-right px-8 py-2 mt-0 mr-2 font-bold rounded-full'>
            Tweet
          </button>
        </div>
      </div>
    </form>
  )
}
