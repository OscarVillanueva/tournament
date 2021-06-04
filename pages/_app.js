import "tailwindcss/tailwind.css"
import WorldState from '../context/world/WorldState'
import EliminationState from '../context/elimination/EliminationState'
import GlobalState from '../context/global/GlobalState'

function Init({ Component, pageProps }) {
  return (

    <GlobalState>
      <WorldState>
        <EliminationState>
          <Component {...pageProps} />
        </EliminationState>
      </WorldState>
    </GlobalState>

  )
}

export default Init
