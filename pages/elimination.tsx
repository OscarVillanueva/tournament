import React, { FC, useEffect } from 'react'

import Layout from '../components/Layout'

const Elimination: FC = () => {

    useEffect(() => {
        
        if( typeof window !== "undefined" ) {

            generateBrackets()

        }

    }, [])

    const generateBrackets = async () => {
        
        const config = [{
            id: 0,
            tournament_id: 0,
            name: "Eliminación directa",
            type: "single_elimination",
            number: 1,
            settings: {
                size: 16,
                seedOrdering: [
                    "natural",
                    "natural",
                    "reverse_half_shift",
                    "reverse"
                ],
                grandFinal: "single",
                matchesChildCount: 0
            }
        }]

        try {

            const [ participants, matches, matchGames ] = await Promise.all([

                (await fetch( "http://localhost:4000/participant" )).json(),
                (await fetch( "http://localhost:4000/match" )).json(),
                (await fetch( "http://localhost:4000/match_game" )).json(),

            ])

            window.bracketsViewer.render({
                stages: config,
                matches,
                matchGames,
                participants
            }, {
                selector: '#example',
                participantOriginPlacement: 'before',
                separatedChildCountLabel: true,
                showSlotsOrigin: true,
                showLowerBracketSlotsOrigin: false,
                highlightParticipantOnHover: true,

            })
            
        } catch (error) {
            console.log(error)
        }
        

    }

    return ( 
        <Layout>
            <h1>Eliminación directa</h1> 

            <div className="md:grid md:grid-cols-2 mt-8 gap-8 w-11/12 mx-auto md:w-full">

            <div>
                    <h3 className = "text-center text-white text-lg mb-4">
                        Rol
                    </h3>

                    <div className="max-h-100 overflow-y-scroll">

                        {/* {matches.map(( game: Match ) => (
                        
                            <Matches
                                key = { game.id }
                                round = { game.round }
                                participants = { game }
                                closed = { game.closed }
                            />
                        ))} */}

                    </div>


                </div>
                
                <div>

                    <h3 className = "text-center text-white text-lg mt-8 md:mt-0">
                        Ranking
                    </h3>

                    {/* <Ranking 
                        ranking = { ranking }
                    /> */}

                    <div id="example" className = "bracket-viewer"></div>

                </div>

            </div>

            

        </Layout>   
    );
}
 
export default Elimination;