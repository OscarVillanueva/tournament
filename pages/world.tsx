import React,{ FC } from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'

const Row = styled.tr`
    border-bottom: 1px solid#d97706;
`

export interface WorldProps {
    
}
 
const World: FC<WorldProps> = () => {
    return (
        <Layout>

            <h1
                className = "text-center text-white text-3xl pt-8"
            >
                Todos contra todos
            </h1>

            <div className="md:grid md:grid-cols-2 mt-8 gap-8">

                <div>
                    <h3 className = "text-center text-white text-lg">
                        Rol
                    </h3>
                </div>
                
                <div>
                    <h3 className = "text-center text-white text-lg">
                        Ranking
                    </h3>

                    <table className = "w-full mt-4 border border-yellow-600">

                        <thead className = "bg-yellow-600">

                            <tr>
                                <th className = "text-center text-white">
                                    Posición
                                </th>

                                <th className = "text-center text-white">
                                    Participante
                                </th>

                                <th className = "text-center text-white">
                                    Victorias
                                </th>

                                <th className = "text-center text-white">
                                    Puntos
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            <Row>

                                <td className = "text-center text-white">1</td>
                                <td className = "text-center text-white">Alguien</td>
                                <td className = "text-center text-white">10</td>
                                <td className = "text-center text-white">8</td>

                            </Row>
                            
                            <Row>

                                <td className = "text-center text-white">2</td>
                                <td className = "text-center text-white">Otro alguien</td>
                                <td className = "text-center text-white">9</td>
                                <td className = "text-center text-white">8</td>

                            </Row>


                        </tbody>

                    </table>

                </div>

            </div>
            
        </Layout>
    );
}
 
export default World;