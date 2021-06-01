import "tailwindcss/tailwind.css"
import WorldState from '../context/world/WorldState'
import EliminationState from '../context/elimination/EliminationState'

function Init({ Component, pageProps }) {
  return (

    <WorldState>
      <EliminationState>
        <Component {...pageProps} />
      </EliminationState>
    </WorldState>

  )
}

export default Init
