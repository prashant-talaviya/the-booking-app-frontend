import React from 'react'
import "./home.css"
import Navbar from "../../components/Navbar/Navbar"
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className='homemain'>
        <div className="homeContainer">
          <Featured />
          <h1 className="homeTitle">Homes guests love</h1>
          <FeaturedProperties />
          <h1 className="homeTitle">Our Listed property</h1>
          <PropertyList />
          <MailList />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home
