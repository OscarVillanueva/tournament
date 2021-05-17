import "tailwindcss/tailwind.css"
import WorldState from '../context/world/WorldState'

function Init({ Component, pageProps }) {
  return (

    <WorldState>
      <Component {...pageProps} />
    </WorldState>

  )
}

export default Init
