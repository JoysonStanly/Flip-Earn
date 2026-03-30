import React from 'react'
import Hero from '../components/Hero'
import LatestListings from "../components/LatestListings";
import Plans from '../components/Plans';
import { Plane } from 'lucide-react';

const Home = () => {
  return (
    
    <>
        
        <Hero />
        <LatestListings />
        <Plans />
    
    </>
  )
}

export default Home