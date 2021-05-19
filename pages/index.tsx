import React from 'react';
import { useRouter } from "next/router";

// Components
import Layout from '../components/Layout'

const Home = () => {

  const router = useRouter()

  return ( 

    <Layout>

      <div className="flex flex-col justify-center items-center w-100 h-screen">

        <h1 className = "text-center text-white text-5xl">
          RoRol
        </h1>

        <div className="md:flex md:justify-between mt-20">

          <div 
            className="mb-8 md:mb-8 text-blue-500 flex flex-col items-center border border-blue-300 rounded p-8 cursor-pointer bg-blue-300"
            onClick = { () => router.push("/world") }
          >

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />

            </svg>

            <p
              className = "text-2xl font-bold mt-8 w-64 text-center text-black text-gray-700"
            >
              Todos contra todos
            </p>

          </div>

          <div 
            className="mb-8 md:mb-8 text-red-500 flex flex-col items-center border border-red-300 rounded p-8 cursor-pointer bg-red-300 md:mx-16"
            onClick = { () => router.push("/elimination") }
          >

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />

            </svg>

            <p
              className = "text-2xl font-bold mt-8 w-64 text-center text-black text-gray-700"
            >
              Eliminación directa
            </p>

          </div>

          <div 
            className="mb-8 md:mb-8 text-yellow-600 flex flex-col items-center border border-yellow-300 rounded p-8 cursor-pointer bg-yellow-300"
            onClick = { () => router.push("/groups") }
          >

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />

            </svg>

            <p
              className = "text-2xl font-bold mt-8 w-64 text-center text-black text-gray-700"
            >
              Grupos
            </p>

          </div>

        </div>

        <button
          className = "text-white"
          onClick = { () => console.log("Modal o algo para seleccionar los torneos activos") }
        >
          Ir a torneo
        </button>

      </div>
    
    </Layout>

  );
}
 
export default Home;
