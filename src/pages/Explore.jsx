import React from 'react';
import Navi from '../components/General/Navbar';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import ArtistCard from '../components/ArtistCard';
import Cath from '../components/Cath';
import Footer from '../components//General/Footer';

const genreData = [
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

const dataPostCard = [
  {
    image: 'image/bg/photo.jpg',
    title: 'Photographic Art',
    author: {
      avatar: 'author1.jpg',
      name: 'Lisa',
    },
    love: 100,
    save: 50,
  },
  {
    image: 'image/bg/graphic.jpg',
    title: 'Graphh',
    author: {
      avatar: 'author2.jpg',
      name: 'Zhang Miao Yi',
    },
    love: 200,
    save: 75,
  },
  {
    image: 'image/bg/concept.jpg',
    title: 'Your Imagination',
    author: {
      avatar: 'author3.jpg',
      name: 'Gojo Satoru',
    },
    love: 150,
    save: 60,
  },
  {
    image: 'image/bg/fineart.jpeg',
    title: 'IsKinda Fine',
    author: {
      avatar: 'author4.jpg',
      name: 'IU',
    },
    love: 180,
    save: 70,
  },
  {
    image: 'image/bg/ins.jpg',
    title: 'Ins Art',
    author: {
      avatar: 'author5.jpg',
      name: 'Kugisaki Nobara',
    },
    love: 220,
    save: 90,
  },
  {
    image: 'image/bg/sculpture.jpg',
    title: 'Sculpture',
    author: {
      avatar: 'author6.jpg',
      name: 'Uzumaki Naruto',
    },
    love: 160,
    save: 80,
  },
];


const dataArtists = [
  {
    image: "/image/artist1.jpg",
    name: "Liz",
    desc: "Artist from South Korea, Loves to Draw and Sing",
  },
  {
    image: "/image/artist2.jpg",
    name: "Juyy",
    desc: "Love me if you love arts",
  },
  {
    image: "/image/artist3.jpg",
    name: "ElJH",
    desc: "Arts are about your personality",
  },
];

const Explore = () => {
  return (
    <div className="mt-20 min-h-screen px-2 flex flex-col items-center">
      <Navi />
      
      <div className="md:max-w-xl w-full p-3">
        <SearchBar />
      </div>

      <h1 className="text-3xl mt-8 text-center">Top Genre</h1>

      <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-3 sm:grid-cols-1 mr-3">
        {genreData.map((genre, index) => (
          <Cath key={index} data={genre} />
          
        ))}
      </div>
      <h1 className="text-3xl mt-5 text-center">Top ArtWorks</h1>

<div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
  {dataPostCard.map((post, index) => (
    <div key={index}  className="w-full ">
      <PostCard
        image={post.image}
        title={post.title}
        author={post.author}
        love={post.love}
        save={post.save}
      />
    </div>
  ))}
</div>
<h1 className="text-3xl mt-5 text-center">Top Artists</h1>
<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
{dataArtists.map((artist, index) => (
        <ArtistCard
          key={index}
          image={artist.image}
          name={artist.name}
          desc={artist.desc}
        />
      ))}
</div>

<Footer/>

    </div>
  );
};

export default Explore;
