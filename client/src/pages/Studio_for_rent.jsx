import { Navbar, Footer } from "../components"
import { HomeCard } from "../components"

const Studio_for_rent = () => {
  return (
    <>
      <Navbar/>
      
      <section className="bg-red-500 mx-[3vw] h-fit flex flex-wrap justify-center">
           
           <HomeCard/>
           <HomeCard/>
           <HomeCard/>
           <HomeCard/>
           <HomeCard/>
           <HomeCard/>
           <HomeCard/>
           <HomeCard/>
           <HomeCard/>
           <HomeCard/>
       </section>
            
      <Footer/>
    </>
  )
}

export default Studio_for_rent