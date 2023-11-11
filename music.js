let songIndex = 0;
let audioElement = new Audio("hasi.mp3");
let play = document.getElementById("play");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let playsong = Array.from(document.getElementsByClassName("playsongs"));
let playsongname = document.getElementById("playsongname");

let songs = [
  { songName: "Dandelions", filePath: "audio/1.mp3", coverPage: "cover/1.jpg" },
  { songName: "Galliyan", filePath: "audio/2.mp3", coverPage: "cover/2.jpg" },
  {
    songName: "Tune Jo Na Kaha",
    filePath: "audio/3.mp3",
    coverPage: "cover/3.jpg",
  },
  { songName: "Woh Lamhe ", filePath: "audio/4.mp3", coverPage: "cover/4.jpg" },
  {
    songName: "Dusk Till Dawn Ft. Sia",
    filePath: "audio/5.mp3",
    coverPage: "cover/5.jpg",
  },
  {
    songName: "Ye Ishq Hai",
    filePath: "audio/6.mp3",
    coverPage: "cover/6.jpg",
  },
  {
    songName: "Man On The Moon",
    filePath: "audio/7.mp3",
    coverPage: "cover/7.jpg",
  },
  {
    songName: "Ed Sheeran - Perfect",
    filePath: "audio/8.mp3",
    coverPage: "cover/8.jpg",
  },
  {
    songName: "Unstoppable",
    filePath: "audio/9.mp3",
    coverPage: "cover/9.jpg",
  },
  { songName: "Hasi", filePath: "audio/10.mp3", coverPage: "cover/10.jpg" },
];

playsong.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPage;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

play.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  } else {
    audioElement.pause();
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
    gif.style.gif = 0;
  }
});

const playAll = () => {
  Array.from(document.getElementsByClassName("musicPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
    }
  );
};

/*Array.from(document.getElementsByClassName("musicPlay")).forEach((element)=>{
        element.addEventListener('click',(e)=>{
            if (!audioElement.paused && parseInt(e.target.id) === songIndex) {
                
                e.target.classList.remove("fa-pause");
                audioElement.pause();
                e.target.classList.add("fa-play");
                
                musicplay.classList.remove("fa-pause");
                musicplay.classList.add("fa-play");
                
            } else {
                playAll();
            }
            //playAll();
        
        songIndex=parseInt(e.target.id)
        console.log(e.target);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src=`audio/${songIndex+1}.mp3`;
       
        audioElement.currentTime=0;
        playsongname.innerText=songs[songIndex].songName;
        audioElement.play();
        play.classList.remove("fa-play");
        play.classList.add("fa-pause");
       


        

        })
    })*/
let isPaused = true; // Initialize the flag to indicate that the song is paused

Array.from(document.getElementsByClassName("musicPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    // Check if the clicked button is the same as the one being played
    if (!audioElement.paused && parseInt(e.target.id) === songIndex) {
      // Pause the song if it is currently playing
      audioElement.pause();
      isPaused = true;
      e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
      play.classList.remove("fa-pause");
      play.classList.add("fa-play");
    } else {
      // Play the song if it was paused
      if (isPaused) {
        playAll();
        //audioElement.currentTime=audioElement.duration*myProgressBar.value/100;

        songIndex = parseInt(e.target.id);
        console.log(e.target);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = `audio/${songIndex + 1}.mp3`;
        //myProgressBar.value=timeprogress;

        //audioElement.currentTime=audioElement.duration*myProgressBar.value/100;
        audioElement.currentTime = 0;
        playsongname.innerText = songs[songIndex].songName;
        audioElement.play();

        play.classList.remove("fa-play");
        play.classList.add("fa-pause");
        isPaused = false;
      }
    }
  });
});

document.getElementById("prev").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `audio/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  playsongname.innerText = songs[songIndex].songName;
  audioElement.play();
  play.classList.remove("fa-play");
  play.classList.add("fa-pause");
});

document.getElementById("fwd").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = `audio/${songIndex + 1}.mp3`;
  playsongname.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();

  play.classList.remove("fa-play");
  play.classList.add("fa-pause");
});

audioElement.addEventListener("timeupdate", () => {
  timeprogress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = timeprogress;
});

myProgressBar.addEventListener("change", () => {
  //audioElement.currentTime=audioElement.duration*myProgressBar.value/100;
  const duration = audioElement.duration;
  const progressBarValue = myProgressBar.value;

  if (
    !isNaN(duration) &&
    isFinite(duration) &&
    !isNaN(progressBarValue) &&
    isFinite(progressBarValue)
  ) {
    audioElement.currentTime = (duration * progressBarValue) / 100;
  } else {
    // Handle the case where duration or progressBarValue is not a valid number
    console.error("Invalid duration or progressBarValue");
  }
});
