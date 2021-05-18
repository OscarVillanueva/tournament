import { useEffect, useState } from 'react';

interface Index {
    index: string,
    keyPath: string,
    options: object
}

interface Actions {
    openDB: boolean,
    saveIntoDatabase: ( item: object, sucess: Function, complete: Function, error: Function ) => void,
    retriveData: ( sucess: Function ) => void,
    deleteItem: ( item: any, error: Function, sucess: Function) => void,
    tryToOpenDatabase: () => void
}

export interface useIndexDBProps {
    databaseName: string, 
    indexes: Index[]
}


const useIndexDb = ({ databaseName, indexes }: useIndexDBProps ) : Actions  => {

    const [DB, setDB] = useState(null)
    const [openDB, setOpenDB] = useState(false)
    
    useEffect(() => {
        
        tryToOpenDatabase()

    }, [])

    const tryToOpenDatabase = () => {
        
        if ( typeof window !== "undefined" ) {

            const createDB = window.indexedDB.open( databaseName, 1 )

            createDB.onerror = () => console.log("Hubo un error al intentar crear la DB")

            createDB.onsuccess = () => {

                setDB( createDB.result )
                setOpenDB( true )

            }

            createDB.onupgradeneeded = e => {

                let db = e.target.result

                let objectStore = db.createObjectStore( databaseName, {
                    kaypath: "key",
                    autoIncrement: true                    
                })

                indexes.forEach(index => {
                    
                    objectStore.createIndex( index.index, index.keyPath, index.options)

                })
                

                setOpenDB( true )

            }        
            
        }

    }

    const saveIntoDatabase = ( item: object, sucess: Function, complete: Function, error: Function ) => {
        
        let transaction = DB.transaction( [ databaseName ], "readwrite" )
        let objectStore = transaction.objectStore( databaseName )

        let request = objectStore.add( item )

        request.onsuccess = sucess

        transaction.oncomplete = complete
        transaction.onerror = error

    }

    const retriveData = ( sucess: Function) => {
        
        if( !DB ) return null

        let objectStore = DB.transaction( databaseName ).objectStore( databaseName )

        objectStore.openCursor().onsuccess = sucess

    }

    const deleteItem = ( item: any, error: Function, sucess: Function) => {

        if( !DB ) return null

        const transaction = DB.transaction([ databaseName ], "readwrite")
                                .objectStore( databaseName )
                                .delete( item )

        // TODO: Events no trigerred
        transaction.onsucess = () => console.log("Eliminado")
        transaction.oncomplete = () => console.log("completo")
        transaction.onerror = () => console.log("Error")

    }

    return {
        openDB,
        saveIntoDatabase,
        retriveData,
        deleteItem,
        tryToOpenDatabase
    }

}
 
export default useIndexDb;