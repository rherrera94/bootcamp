
import prisma from 'lib/prisma'
import { getTweets } from 'lib/data.js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NewTweet from 'components/NewTweet'
import Tweets from 'components/Tweets'

export default function Home({ tweets }) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const router = useRouter()

  if (loading) {
    return null
  }

  if (!session) {
    router.push('/')
  }

  return (
    <>
      <NewTweet />
      <Tweets tweets={tweets} />
    </>
  )
}

//Esto lo que va a hacer es que el servidor cargue antes de cargar la pagina todos los twwets que hay
//te deja los tweets serverprops entonces directamente despues las rescato como si fueran una variable que se pasa

export async function getServerSideProps() {
	let tweets = await getTweets(prisma) //viene de lib/data.js y hace un findmany
  tweets = JSON.parse(JSON.stringify(tweets))

  return {
    props: {
      tweets,
    },
  }
}