import React, { FC } from 'react'
import styled from 'styled-components'

const Row = styled.tr`
    border-bottom: 1px solid#d97706;
`

export interface RankingProps {
    
}
 
const Ranking: FC<RankingProps> = () => {
    return ( 
        <table className = "w-full mt-4 border border-yellow-600 rounded">

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
                    <td className = "text-center text-white">Kirino / Flaco</td>
                    <td className = "text-center text-white">10</td>
                    <td className = "text-center text-white">8</td>

                </Row>
                
                <Row>

                    <td className = "text-center text-white">2</td>
                    <td className = "text-center text-white">Javi / Niño</td>
                    <td className = "text-center text-white">9</td>
                    <td className = "text-center text-white">8</td>

                </Row>


            </tbody>

        </table>

    );
}
 
export default Ranking;