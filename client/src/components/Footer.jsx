import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BsAt} from 'react-icons/bs'

const Array_Of_HomeType = [
  {
    homeType : 'Studio',
    navLink :'studio'
  },
  {
    homeType : 'Chambre',
    navLink : 'chambre'
  },
  {
    homeType : 'Appartement',
    navLink : 'appartement'
  },
  {
    homeType : 'Espace Commercial',
    navLink : 'espace commercial'
  }
]

const Array_of_company_infos = ['About Us', 'Contact Us', 'Ressources']

const Footer = () => {
  
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItems(items => ({...items, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const URL = 'http://localhost:8080'

    try {
      const response = await axios.post(URL + "/api/receiveEmail", {
          subject: items.subject,
          email: items.email,
          message: items.message, //'<br>' + 'This is my Email Box' + items.email
          
      });
      setIsLoading(true); //doesn't work, look why later. It seems I don't reach here
      setItems({}); //doesn't work, look why later
      //console.log(response.data);
    
    } catch (error) {
      console.error('Error sending email:', error);
      alert("Some error(s) occured ");
    }     
      alert("Message Submitted :-) ");    
  }

  return (
    <div className='flex flex-col justify-center bg-[#1B4571] w-full h-fit px-5 text-white pb-5"'>
        <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-y-1 lg:gap-x-80">
          <div className="flex flex-col mt-4">
            { Array_Of_HomeType.map((item) => (
                <Link key={item.homeType} className='hover:no-underline mt-2 text-xl' to={`/home_type?type=${item.navLink}&page=1`}>{item.homeType}</Link>
              ))
            }          
          </div>
            
          <div className="flex flex-col mt-4">
            { Array_of_company_infos.map((item, i) => (
                <Link key={i} className='hover:no-underline mt-2 text-xl' to="#" >{item}</Link>
              ))
            }
          </div>
          <div className="flex flex-col mt-4">
            <form onSubmit={handleSubmit}>
                  <span className='text-xl'>Send us a message</span>

                  <div className="flex mt-2 ml-1 mb-2">
                    <input type="text" name="subject" value={items.subject || ""} onChange={handleChange} required className='text-[#1b4571] rounded-lg h-8 w-[255px] px-2 outline-none' placeholder='Your subject here'/>
                  </div>                  
                  <div className="flex mt-2 ml-1 mb-2">
                    <input type="email" name="email" value={items.email || ""} onChange={handleChange} required className='text-[#1b4571] rounded-lg h-8 w-[255px] px-2 outline-none' placeholder='Your email here'/>
                  </div> 
                  <div className='mb-2'>
                    <textarea name="message" required maxLength="500" className="text-[#1b4571] ml-1 rounded-lg px-[5px] outline-none resize-none w-[255px]" rows="4" cols="31" value={items.message || ""} onChange={handleChange} placeholder="Your message here (maximum 500 characters)" />
                  </div>
                    
                  <button type="submit" className='flex justify-center items-center text-2xl font-semibold w-[255px] px-1 bg-sky-500 text-white ml-1 rounded-sm h-10 cursor-pointer hover:opacity-50'>{isLoading ? 'Loading...' : 'Send' }</button>
            </form>
          </div>      
        </div>
        <div className='flex justify-center mb-1'>
            <span><BsAt/></span>2023 . Houz LLC . AllRight Reserved
        </div>
    </div>
  )
}

export default Footer


