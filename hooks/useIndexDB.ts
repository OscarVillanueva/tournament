import React, { useEffect } from 'react';

export interface useIndexDBProps {
    databaseName: string, 
    indexes: Index[]
}

interface Index {
    index: string,
    keyPath: string,
    options: object
}

const useIndexDb = ( config: useIndexDBProps ) => {

    let DB: any
    
    useEffect(() => {
        
        if ( typeof window !== "undefined" ) {

            const createDB = window.indexedDB.open( config.databaseName, 1 )

            createDB.onerror = () => console.log("Hubo un error al intentar crear la DB")

            createDB.onsuccess = () => DB = createDB.result

            createDB.onupgradeneeded = e => {

                let db = e.target.result

                let objectStore = db.createObjectStore( config.databaseName, {
                    kaypath: "key",
                    autoIncrement: true                    
                })

                config.indexes.forEach(index => {
                    
                    console.log(`index`, index)
                    objectStore.createIndex( index.index, index.keyPath, index.options)

                })
                

                console.log("BD Creada Y Lista")

            }        
            
        }

    }, [])

}
 
export default useIndexDb;