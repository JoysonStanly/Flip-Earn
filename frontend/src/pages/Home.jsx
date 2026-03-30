import React from 'react'
import Hero from '../components/Hero'
import LatestListings from "../components/LatestListings";
import Plans from '../components/Plans';
import { Plane } from 'lucide-react';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    
    <>
        
        <Hero />
        <LatestListings />
        <Plans />
        <CTA />
        <Footer />
    
    </>
  )
}

export default Home