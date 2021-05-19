import {} from 'react';

interface Actions {
    setIntoStorage: ( key: string, data: any ) => void,
    deleteFromStorage: ( key: string ) => void,
    getFromStorage: ( key: string ) => any
}

const useLocalStorage = ( prefix: string) : Actions => {

    const setIntoStorage = ( key: string, data: any ) => {
        
        if( typeof window !== "undefined" ) 
            window.localStorage.setItem( `${prefix}_${key}`, JSON.stringify( data ) )

        else throw new Error("LocalStorage no esta disponible")

    }

    const deleteFromStorage = ( key: string ) => {
        
        if( typeof window !== "undefined" ) 
            window.localStorage.removeItem( `${prefix}_${key}` )

        else throw new Error("LocalStorage no esta disponible")

    }

    const getFromStorage = ( key: string ) : any =>{
        
        if( typeof window !== "undefined" ) 
            return JSON.parse(window.localStorage.getItem( `${prefix}_${key}` ))

        else throw new Error("LocalStorage no esta disponible")

    }

    return {
        setIntoStorage,
        deleteFromStorage,
        getFromStorage
    };
}
 
export default useLocalStorage;