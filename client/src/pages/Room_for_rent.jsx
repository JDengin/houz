import { Navbar, Footer } from "../components"
import { HomeCard } from "../components"

const Room_for_rent = () => {
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

export default Room_for_rent 

