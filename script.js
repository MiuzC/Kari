const yearEl = document.getElementById('year')
yearEl.textContent = new Date().getFullYear()

const galleryBtn = document.getElementById('btn-gallery')
const trailerBtn = document.getElementById('btn-trailer')
const playHero = document.getElementById('play-trailer-hero')
const modalGallery = document.getElementById('modal-gallery')
const modalTrailer = document.getElementById('modal-trailer')
const closeGallery = document.getElementById('close-gallery')
const closeTrailer = document.getElementById('close-trailer')
const modalImage = document.getElementById('modal-image')
const images = Array.from(document.querySelectorAll('.images-grid img'))
const prevImg = document.getElementById('prev-img')
const nextImg = document.getElementById('next-img')
const trailerPlayer = document.getElementById('trailer-player')

let currentIndex = 0

function openGallery(index){
  currentIndex = index
  modalImage.src = images[currentIndex].src
  modalGallery.classList.remove('hidden')
  document.body.style.overflow = 'hidden'
}
function closeAll(){
  modalGallery.classList.add('hidden')
  modalTrailer.classList.add('hidden')
  document.body.style.overflow = ''
  if(trailerPlayer && !trailerPlayer.paused) trailerPlayer.pause()
}
images.forEach((img, i)=>{
  img.addEventListener('click', ()=> openGallery(i))
})
galleryBtn.addEventListener('click', ()=> openGallery(0))
closeGallery.addEventListener('click', closeAll)
closeTrailer.addEventListener('click', closeAll)
playHero.addEventListener('click', ()=>{
  modalTrailer.classList.remove('hidden')
  document.body.style.overflow = 'hidden'
  setTimeout(()=> { if(trailerPlayer) trailerPlayer.play() }, 200)
})
trailerBtn.addEventListener('click', ()=>{
  modalTrailer.classList.remove('hidden')
  document.body.style.overflow = 'hidden'
})
prevImg.addEventListener('click', ()=>{
  currentIndex = (currentIndex - 1 + images.length) % images.length
  modalImage.src = images[currentIndex].src
})
nextImg.addEventListener('click', ()=>{
  currentIndex = (currentIndex + 1) % images.length
  modalImage.src = images[currentIndex].src
})
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeAll()
  if(!modalGallery.classList.contains('hidden')){
    if(e.key === 'ArrowLeft') prevImg.click()
    if(e.key === 'ArrowRight') nextImg.click()
  }
})
document.addEventListener('click', (e)=>{
  if(e.target === modalGallery) closeAll()
  if(e.target === modalTrailer) closeAll()
})