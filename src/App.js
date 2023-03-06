import './App.css';
import Header from './components/Header/Header';
import React, { useEffect, useState } from 'react'; 
import { Grid, Paper } from '@mui/material';
import { ThumbUpAlt, Instagram, Twitter } from '@mui/icons-material';
import Modal from 'react-modal';

function App() {
  const ACCESS_KEY = 'sL5OjT3ArXKeTik_nUhUsydu5RRNXhCWqHajBMymaW8'; 
  const [images, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [curimage, setCurimage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(searchTerm!='') {
    fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${ACCESS_KEY}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const parsedData = data.results.map(images => {
          return {
            id: images.id,
            url: images.urls.thumb,
            user: images.user.name,
            likes: images.likes,
            userphoto: images.user.profile_image.small,
            instagram_name: images.user.instagram_username
          };
        });
        setPhotos(parsedData);
      })
      .catch(error => {
        console.error(error);
      });
    }
    else {
      fetch(`https://api.unsplash.com/photos?client_id=${ACCESS_KEY}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const parsedData = data.map(images => {
          return {
            id: images.id,
            url: images.urls.thumb,
            url_high:images.urls.raw,
            user: images.user.name,
            likes: images.likes,
            userphoto: images.user.profile_image.small,
            instagram_name: images.user.instagram_username,
            twitter_name:images.user.twitter_username,
            bio:images.user.bio,
            download:images.links.download
          };
        });
        setPhotos(parsedData);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const togglePopup = (index) => {
    setCurimage(images.at(index));
    setShowPopup(!showPopup);
    setIsOpen(!isOpen);
  };

  const toggleModal = (index) => {
    setCurimage(images.at(index));
    setIsOpen(!isOpen);
  };
  


  return (
    <div className="App">
      {isOpen && 
      <Modal isOpen={isOpen} style={{position:'relative',height:'70%'}} onRequestClose={toggleModal}>
        <Grid container style={{height:'90%'}}>
        <Grid xs={9}>
          <Paper>
              <img src={curimage.url_high} alt={curimage.id} className="popup_image" />
          </Paper>
        </Grid>
        <Grid xs={3} style={{height:'100%'}}>
          <Grid style={{height:'100%'}}>
          <Paper style={{padding:'15px', height:'100%'}}>
              <div style ={{display: 'flex', alignItems: 'center',justifyContent:'flex-start'}}> 
              <img src={curimage.userphoto} className='user_image' />
              <p style={{marginLeft:'5px', fontSize:'0.8rem', fontWeight:'bolder'}} > {curimage.user} {'\n'} 
              <p style={{marginTop:'0px', marginLeft:'1px', fontStyle:'italic', fontWeight:'lighter', fontSize:'0.6rem'}} >{ curimage.instagram_name ?  `@${curimage.instagram_name} ` : 'NA' } </p> </p>
              <div style ={{marginLeft: 'auto',display: 'flex', alignItems: 'center', justifyContent:'flex-end'}}> 
                        <ThumbUpAlt className='like' style={{ fontSize: '0.8rem' }}/> <span style={{margin:'2px',fontSize:'0.8rem'}} >{curimage.likes} </span>
                      </div> 
            </div> 
            <Grid xs={12}>
           <span style={{marginLeft:'5px', fontStyle:'italic', fontSize:'0.6rem', display:'flex',alignItems:'center'}} > <Instagram style={{fontSize:'0.7rem', fontStyle:'italic', marginLeft:'2px'}}/> { curimage.instagram_name ?  `/@${curimage.instagram_name} ` : 'NA' } </span>   
          </Grid>
          <Grid xs={12}>
           <span style={{marginLeft:'5px', fontStyle:'italic', fontSize:'0.6rem', display:'flex',alignItems:'center'}} > <Twitter style={{fontSize:'0.7rem', fontStyle:'italic', marginLeft:'2px'}}/> { curimage.twitter_name ?  `/@${curimage.twitter_name} ` : 'NA' } </span>   
          </Grid>
          <Grid xs={12}>
           <span style={{marginTop:'10px' ,marginLeft:'5px', fontStyle:'italic', fontSize:'0.6rem', display:'flex',alignItems:'center'}} >  { curimage.bio ?  `"${curimage.bio}" ` : 'NA' } </span>   
          </Grid>
          <Grid>
            <button 
            className="download-button" 
            style={{backgroundColor: 'green', color: 'white', borderColor:'green', borderRadius:'5px',borderWidth:'0px', padding:'7px', marginTop:'5px', paddingLeft:'10px',paddingRight:'10px'}}
            onClick={() => { window.location.href=curimage.download}}
          >
            Download
          </button>
          </Grid>
          </Paper>
          </Grid>
        </Grid>
      </Grid>
        <span className="close" onClick={toggleModal}>
        &times;
        </span>
      </Modal>}

       <Header onChange={handleSearch}/>
       <Grid className="image-grid" container spacing={3} style={ { boxShadow: 'none'}}>
          {images.map((photo,index) => (
            <Grid className="single-image-grid" key={photo.id} item xs={4} style={ { boxShadow: 'none'}}>
                <Paper style={ { boxShadow: 'none'}}>
                  <div className="e-card">
                    <div className="e-card-image" onClick={() => toggleModal(index)} style={{backgroundImage: `url(${photo.url})`, backgroundRepeat:'no-repeat',backgroundSize:'contain', }}>
                      <div className="e-card-title" style={{fontSize:'0.8rem'}} >{photo.user} </div>
                    </div>
                    <div className="e-card-content" style={{display:'flex'}}>
                      
                      <div style ={{display: 'flex', alignItems: 'center',justifyContent:'flex-start'}}> 
                        <img src={photo.userphoto} className='user_image' />
                        <span style={{marginLeft:'5px', fontStyle:'italic', fontSize:'0.6rem'}} >{ photo.instagram_name ?  `@${photo.instagram_name} ` : 'NA' } </span>
                      </div> 

                      <div style ={{marginLeft: 'auto',display: 'flex', alignItems: 'center', justifyContent:'flex-end'}}> 
                        <ThumbUpAlt className='like' style={{ fontSize: '1rem' }}/> <span style={{margin:'2px'}} >{photo.likes} </span>
                      </div> 
                     </div>
                  </div>
                </Paper>
            </Grid>
            // <div key={photo.id}>
            //   <img src={photo.url} alt={photo.id} />
            //   <p>Photo by {photo.user}</p>
            //   <p>{photo.likes} likes</p>
            // </div>
          ))}
       </Grid>
       
    </div>
  );
}

export default App;
