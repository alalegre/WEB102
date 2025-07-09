import { useState } from 'react'
import './App.css'
import Display from './Components/Display'
import HistoryBar from './Components/HistoryBar'
import BanList from './Components/BanList'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {

  const [banned, setBanned] = useState({
    cameras: new Set(),
    sols: new Set(),
    dates: new Set(),
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [currentSol, setCurrentSol] = useState(0);
  const [currentCamera, setCurrentCamera] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const flatBans = [
    /*
      - Array.from(banned.cameras) -> turns the Set into a real array so you can .map() it
      - .map(v => ({ type: 'cameras, value: v }) -> Turns every item (like "NAVCAM") into an object like this: 
        - { type: 'cameras', value: 'NAVCAM' }
      - ... (spread operator) -> flattels all the arrays into one list
        - [
            { type: 'cameras', value: 'NAVCAM' },
            { type: 'cameras', value: 'MAST' },
            { type: 'sols', value: 432 },
            { type: 'dates', value: '2022-07-18' }
          ]
    */
    ...Array.from(banned.cameras).map(v => ({ type: 'cameras', value: v })),
    ...Array.from(banned.sols).map(v => ({ type: 'sols', value: v })),
    ...Array.from(banned.dates).map(v => ({ type: 'dates', value: v })),
  ];

  const MAX_ATTEMPTS = 10;

  const randomSol = () => {
    return Math.floor(Math.random() * 10) + 1;
  }

  const ranNum = (maxLen) => {
    return Math.floor(Math.random() * maxLen);
  }

  // Tries to find a valid photo, retrying up to MAX_ATTEMPTS times
  const fetchValidPhoto = async () => {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      let sol;
      do {
        sol = randomSol();
      } while (banned.sols.has(sol));  // skip banned sols here

      const query = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${ACCESS_KEY}`;
      console.log(`Attempt ${attempt}: Querying sol: ${sol}`);

      try {
        const response = await fetch(query);
        const json = await response.json();

        const allowedPhotos = json.photos.filter(p =>
          !banned.cameras.has(p.camera.name) &&
          !banned.sols.has(p.sol) &&
          !banned.dates.has(p.earth_date)
        );

        if (allowedPhotos.length) {
          const randomNum = ranNum(allowedPhotos.length);
          const photo = allowedPhotos[randomNum];  // or random pick
          return {
            sol,
            img_src: photo.img_src,
            id: photo.id,
            camera: photo.camera.name,
            date: photo.earth_date
          };
        }

        // Found a valid photo
        if (json.photos && json.photos.length > 0) {
          const randomNum = ranNum(json.photos.length);
          const photo = json.photos[randomNum];

          // Return a lot of the photo's meta information
          return { sol, img_src: photo.img_src, id: photo.id, camera: photo.camera.name, date: photo.earth_date };
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    return null;
  };

  // 
  const submitForm = async () => {
    const result = await fetchValidPhoto();

    if (result) {
      setCurrentCamera(result.camera);
      setCurrentSol(result.sol);
      setCurrentImage(result.img_src);
      setCurrentDate(result.date);
    } else {
      alert('No photos found after several tries. Please try again.');
    }
  };

  function banAttribute(type, value) {
    /*
      - prev : whatever is currently stored in banned and pass it as the parameter
      - whatever the function returns becomes the new state
    */
    setBanned(prev => {
      // Make a copy of the Set to keep React state immutable
      const updated = new Set(prev[type]);

      // If the item exists, delete it from the Set
      if (updated.has(value)) {
        updated.delete(value);
      }

      // If the item does not exist, add it to the Set
      else {
        updated.add(value);
      }

      // Return a brand-new state object
      return { ...prev, [type]: updated };
    });
  }

  return (
    <div className='App'>
      {/* <HistoryBar /> */}
      <Display image={currentImage} camera={currentCamera} sol={currentSol} date={currentDate} onSubmit={submitForm} onBan={banAttribute} />   {/* image - rover : camera - sol - rover  */}
      <BanList items={flatBans} onClick={banAttribute} />
    </div>
  )
}

export default App
