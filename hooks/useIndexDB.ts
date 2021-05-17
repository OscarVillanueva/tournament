import React, { useEffect } from 'react';

interface Index {
    index: string,
    keyPath: string,
    options: object
}

export interface useIndexDBProps {
    databaseName: string, 
    indexes: Index[]
}


const useIndexDb = ({ databaseName, indexes }: useIndexDBProps ) : { saveIntoDatabase: Function }  => {

    let DB: any
    
    useEffect(() => {
        
        if ( typeof window !== "undefined" ) {

            const createDB = window.indexedDB.open( databaseName, 1 )

            createDB.onerror = () => console.log("Hubo un error al intentar crear la DB")

            createDB.onsuccess = () => DB = createDB.result

            createDB.onupgradeneeded = e => {

                let db = e.target.result

                let objectStore = db.createObjectStore( databaseName, {
                    kaypath: "key",
                    autoIncrement: true                    
                })

                indexes.forEach(index => {
                    
                    objectStore.createIndex( index.index, index.keyPath, index.options)

                })
                

                console.log("BD Creada Y Lista")

            }        
            
        }

    }, [])

    const saveIntoDatabase = ( item: object, sucess: Function, complete: Function, error: Function ) => {
        
        let transaction = DB.transaction( [ databaseName ], "readwrite" )
        let objectStore = transaction.objectStore( databaseName )

        let request = objectStore.add( item )

        request.onsuccess = sucess

        transaction.oncomplete = complete
        transaction.onerror = error

    }

    return {
        saveIntoDatabase
    }

}
 
export default useIndexDb;