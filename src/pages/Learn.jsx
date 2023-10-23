import React from 'react';
import Navi from '../components/General/Navbar';
import SearchBar from '../components/SearchBar';
import Cath from '../components/Cath';
import MaterialCard from '../components/MaterialCard';
import Footer from '../components//General/Footer';


export default function Learn(){

    const materials = [
        {
          title: "Surealism Art",
          desc: "Learn surealism art with us here",
          img: "image/art1.jpg",
          to: "/link-to-artwork-1",
        },
        {
          title: "Realism",
          desc: "Learn realism art here",
          img: "image/art2.jpg",
          to: "/link-to-artwork-2",
        },
        {
          title: "Abstract Art",
          desc: "Learn abstract art with us here",
          img: "image/art3.jpg",
          to: "/link-to-artwork-3",
        },
      ];
      

    const cathData = [
        {
          image: 'image/bg/illustration.jpg',
          title: 'Illustration',
        },
        {
          image: 'image/bg/fineart.jpeg',
          title: 'Fine Art',
        },
        {
          image: 'image/bg/graphic.jpg',
          title: 'Graphic Design',
        },
        {
          image: 'image/bg/sculpture.jpg',
          title: 'Sculpture',
        },
        {
          image: 'image/bg/ins.jpg',
          title: 'Installation Art',
        },
        {
          image: 'image/bg/architecture.jpg',
          title: 'Architectural Design',
        },
        {
          image: 'image/bg/digital.png',
          title: 'Digital Painting',
        },
        {
          image: 'image/bg/concept.jpg',
          title: 'Concept Art',
        },
        {
          image: 'image/bg/photo.jpg',
          title: 'Photography',
        },
      ];

      return (
        <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
          <Navi />
          
          <div className="md:max-w-xl w-full p-3">
            <SearchBar />
          </div>
          
    
          <h1 className="text-3xl mt-8">Top Materials</h1>
          
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
  {materials.map((mat, index) => (
    <div key={index}  className="w-full ">
      <MaterialCard  title={mat.title} desc={mat.desc} img={mat.img} to={mat.to} />
    </div>
  ))}
</div>

          <h1 className="text-3xl mt-8">Learn by Categories</h1>

          <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-3 sm:grid-cols-1">
        {cathData.map((cath, index) => (
          <Cath key={index} data={cath} />
          
        ))}
      </div>

          <Footer/>
          </div>
          
          )
}