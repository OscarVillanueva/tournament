import "tailwindcss/tailwind.css"
import "../styles/app.css"
import WorldState from '../context/world/WorldState'
import EliminationState from '../context/elimination/EliminationState'
import GlobalState from '../context/global/GlobalState'
import GroupsState from '../context/groups/GroupsState'

function Init({ Component, pageProps }) {
  return (

    <GlobalState>
      <WorldState>
        <EliminationState>
          <GroupsState>
            <Component {...pageProps} />
          </GroupsState>
        </EliminationState>
      </WorldState>
    </GlobalState>

  )
}

export default Init
