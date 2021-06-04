import { createContext } from 'react';

export type GlobalContent = {

    open: boolean,
    changeTournamentStatus: (status: boolean) => void

}

const GlobalContext = createContext<GlobalContent>({
    open: true,
    changeTournamentStatus: (status: boolean) => {}
})

export default GlobalContext