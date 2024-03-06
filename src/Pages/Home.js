import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomeCover from '../components/HomeCover'
import Slider from '../components/Slider'
import Chategories from '../components/Chategories'

const Home = () => {
  return (
    <>
    <Header/>
    <HomeCover/>
    <Slider/>
    <Chategories/>
    <Footer/>
    </>
  )
}

export default Home