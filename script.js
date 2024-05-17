const musicas = [
    {
      titulo: "Cry for Help",
      artista: "Rick Astley",
      arquivo: "./assets/Cry_for_Help.mp3",
      imagem: "./assets/cryforhelp.png"
    },
    {
      titulo: "Never Tear Us Apart",
      artista: "INXS",
      arquivo: "./assets/Never_Tear_Us_Apart.mp3",
      imagem: "./assets/nevertearusapart.png"
    },
    {
      titulo: "Way Maker Spanish",
      artista: "Hermanos Bueno",
      arquivo: "./assets/Way_Maker_Spanish.mp3",
      imagem: "./assets/waymaker.png"
    }
  ];
  
  let indiceAtual = 0;
  
  const audio = new Audio(musicas[indiceAtual].arquivo);
  const progressBar = document.getElementById("progressBar");
  const buttonPlay = document.getElementById('play');
  const buttonPause = document.getElementById('pause');
  const buttonVoltar = document.getElementById('voltar');
  const buttonAvancar = document.getElementById('avancar');
  const tempoAtual = document.getElementById("tempoAtual");
  const tempoTotal = document.getElementById("tempoTotal");
  const tituloMusica = document.getElementById("tituloMusica");
  const artistaMusica = document.getElementById("artistaMusica");
  const capaMusica = document.getElementById("capaMusica");
  
  let interval;
  
  function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  }
  
  function updateMusicTime() {
    const progresso = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progresso;
    tempoAtual.textContent = formatarTempo(audio.currentTime);
  }
  
  audio.addEventListener('loadedmetadata', function () {
    tempoTotal.textContent = formatarTempo(audio.duration);
  });
  
  audio.addEventListener('timeupdate', updateMusicTime);
  
  function play() {
    buttonPlay.classList.add('hide');
    buttonPause.classList.remove('hide');
    audio.play();
    interval = setInterval(updateMusicTime, 1000);
  }
  
  function pause() {
    buttonPlay.classList.remove('hide');
    buttonPause.classList.add('hide');
    audio.pause();
    clearInterval(interval);
  }
  
  function changeMusic(index) {
    if (index >= 0 && index < musicas.length) {
      indiceAtual = index;
      audio.src = musicas[indiceAtual].arquivo;
      tituloMusica.textContent = musicas[indiceAtual].titulo;
      artistaMusica.textContent = musicas[indiceAtual].artista;
      capaMusica.src = musicas[indiceAtual].imagem;
      audio.load();
      play();
    }
  }
  
  buttonPlay.addEventListener('click', play);
  buttonPause.addEventListener('click', pause);
  
  buttonVoltar.addEventListener('click', () => {
    if (indiceAtual > 0) {
      changeMusic(indiceAtual - 1);
    } else {
      changeMusic(musicas.length - 1); // Volta para a última música se estiver na primeira
    }
  });
  
  buttonAvancar.addEventListener('click', () => {
    if (indiceAtual < musicas.length - 1) {
      changeMusic(indiceAtual + 1);
    } else {
      changeMusic(0); // Vai para a primeira música se estiver na última
    }
  });
  
  progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    updateMusicTime();
  });
  
  // Inicializa o player com a primeira música
  changeMusic(indiceAtual);