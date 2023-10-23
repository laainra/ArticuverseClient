import React from 'react';
import Navi from '../components/General/Navbar';
import SearchBar from '../components/SearchBar';
import ExhibiitonCard from '../components/ExhibitiionCard';
import Footer from '../components//General/Footer';


export default function Exhibition(){

    const currentExh = [
        {
          title: "Abstract Artist Exhibition",
          location: "Madiun",
          date: "10/22/2023",
          img: "image/art4.jpg",
          to: "/link-to-artwork-1",
        },
        {
          title: "Realism Exhibition",
          location: "Jakarta",
          date: "11/15/2023",
          img: "image/art5.jpg",
          to: "/link-to-artwork-2",
        },
        {
          title: "SUPER Art Exhibition",
          location: "Surabaya",
          date: "12/03/2023",
          img: "image/art6.jpg",
          to: "/link-to-artwork-3",
        },
      ];
      
      const pastExh = [
        {
          title: "Abstract Artist Exhibition",
          location: "Jakarta",
          date: "07/08/2022",
          img: "image/art7.jpg",
          to: "/link-to-artwork-1",
        },
        {
          title: "Your ART Exhibition",
          location: "Magetan",
          date: "06/21/2022",
          img: "image/art8.jpg",
          to: "/link-to-artwork-2",
        },
        {
          title: "We Art",
          location: "Madiun",
          date: "11/12/2022",
          img: "image/art9.jpg",
          to: "/link-to-artwork-3",
        },
      ];
      

      return (
        <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
          <Navi />
          
          <div className="md:max-w-xl w-full p-3">
            <SearchBar />
          </div>
          
    

          <h1 className="text-3xl mt-8">Upcomming Exhibition</h1>
          
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
  {currentExh.map((exh, index) => (
    <div key={index}  className="w-full ">
      <ExhibiitonCard  title={exh.title} location={exh.location} date={exh.date} img={exh.img} to={exh.to} />
    </div>
  ))}
</div>
          <h1 className="text-3xl mt-8">Past Exhibition</h1>
          
          <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
  {pastExh.map((exh, index) => (
    <div key={index}  className="w-full ">
      <ExhibiitonCard  title={exh.title} location={exh.location} date={exh.date} img={exh.img} to={exh.to} />
    </div>
  ))}
</div>


          <Footer/>
          </div>
          
          )
}