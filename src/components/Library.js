import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
      super(props);
      this.state = { albums: albumData };
  }

  render() {
   return (
     <section className='library'>
       <header className="bg-primary text-white">
         <div className="container text-center">
           <h1>Library</h1>
           <p className="lead">Please select one of the following albums</p>
         </div>
       </header>
       <section className='libraryList'>
         <div className="list-group">
         {
           this.state.albums.map((album, index) =>
           <Link to={`/album/${album.slug}`} key={index} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="col-md-12">
             <div className="row">
              <div className="col-md-6">
                <img src={album.albumCover} alt={album.title} className='libraryImg' />
              </div>
              <div className="col-md-6">
                 <div className="d-flex w-100 justify-content-between">
                   <h5 className="mb-1">{album.title}</h5>
                   <small>{album.artist}</small>
                 </div>
                 <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                 <small>{album.songs.length} songs</small>
               </div>
              </div>
             </div>
            </Link>
           )
         }
         </div>
      </section>
     </section>
    );
  }
}

export default Library;
