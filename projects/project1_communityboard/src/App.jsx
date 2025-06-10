import { useState } from 'react';
import Board from './components/Boards';
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Games That Have Amazing Story</h1>
      <div className="boards">
        <Board img="/imgs/GhostOfTsushima.jpg" name="Ghost of Tsushima" description="PC, PS4, PS5" link="https://www.playstation.com/en-us/games/ghost-of-tsushima/" />
        <Board img="/imgs/BatmanArkhamAsylum.jpg" name="Batman Arkham Asylum" description="PC, PS4, Xbox" link="https://store.steampowered.com/app/35140/Batman_Arkham_Asylum_Game_of_the_Year_Edition/" />
        <Board img="/imgs/GodOfWar.jpg" name="God of War" description="PC, PS4, PS5" link="https://www.playstation.com/en-us/god-of-war/" />
        <Board img="/imgs/Halo5.jpg" name="Halo 5" description="Xbox" link="https://www.xbox.com/en-US/games/store/halo-5-guardians/brrc2bp0g9p0" />
        <Board img="/imgs/HorizonZeroDawn.jpg" name="Horizon Zero Dawn" description="PC, PS4, PS5" link="https://www.playstation.com/en-us/games/horizon-zero-dawn/" />
        <Board img="/imgs/RedDeadRedemption2.jpg" name="Red Dead Redemption 2" description="PC, PS4, Xbox" link="https://www.rockstargames.com/reddeadredemption2" />
        <Board img="/imgs/Spider-Man2.jpg" name="Spider-Man 2" description="PC, PS5" link="https://www.playstation.com/en-us/games/marvels-spider-man-2/" />
        <Board img="/imgs/TheLastOfUs.jpg" name="The Last of Us" description="PC, PS4, PS5" link="https://www.playstation.com/en-us/games/the-last-of-us-part-i/" />
        <Board img="/imgs/Uncharted4.jpg" name="Uncharted 4" description="PC, PS4, PS5" link="https://www.playstation.com/en-us/games/uncharted-4-a-thiefs-end/" />
        <Board img="/imgs/Undertale.jpg" name="Undertale" description="PC, PS4, Xbox, Switch" link="https://undertale.com/" />
      </div>
    </div>
  )
}

export default App
