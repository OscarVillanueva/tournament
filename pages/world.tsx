import React,{ FC, useEffect } from 'react'

// Componentes
import Layout from '../components/Layout'
import Matches from '../components/Matches'
import Ranking from '../components/Ranking'

// Hook
import useIndexDB from '../hooks/useIndexDB'

const World: FC = () => {

    const { saveIntoDatabase } = useIndexDB({
        databaseName: "World",
        indexes: [
            {
                index: "matches",
                keyPath: "matches",
                options: { unique: false }
            },
            {
                index: "Ranking",
                keyPath: "matches",
                options: { unique: false }
            }
        ]
    })
    
    const success = () => console.log("Se ha agregado correctamente")
    const error = () => console.log("error")
    const complete = () => console.log("Se ha completado la transacción")
    

    return (
        <Layout
            addAction = { (item: object) => saveIntoDatabase( item, success, complete, error ) }
        >

            <h1
                className = "text-center text-white text-3xl md:pt-8"
            >
                Todos contra todos
            </h1>

            <div className="md:grid md:grid-cols-2 mt-8 gap-8 w-11/12 mx-auto md:w-full">

                <div>
                    <h3 className = "text-center text-white text-lg mb-4">
                        Rol
                    </h3>

                    <Matches
                        round = "Ronda 1"
                        participants = {{
                            home: {
                                name: "S. Bolelli / M. Gonzales",
                                score: 0
                            },
                            visitor: {
                                name: "M. Purcel / L. Saville",
                                score: 0
                            }
                        }}
                    />

                </div>
                
                <div>
                    <h3 className = "text-center text-white text-lg mt-8 md:mt-0">
                        Ranking
                    </h3>

                    <Ranking />
                </div>

            </div>
            
        </Layout>
    );
}
 
export default World;