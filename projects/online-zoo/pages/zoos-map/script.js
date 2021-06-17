let zoogeographyAnimals=document.querySelectorAll('.world-map__animal');

let animalsList=[
  {name:"Eagle",
  description:"The broadcast is from an island near Los Angeles. Watch their real life.",
  image:'../../../online-zoo/assets/images/eagle2.png',
  link:'../../../online-zoo/pages/zoos/eagle.html'
  },
  {name:"Gorilla",
  description:"The broadcast comes from the Democratic Republic of the Congo in a forest area. Watch their life and life together.",
  image:'../../../online-zoo/assets/images/gorilla2.png',
  link:'../../../online-zoo/pages/zoos/gorilla.html'
  },
  {name:"Panda",
  description:"The broadcast comes from the mountainous regions of central China: Sichuan and Tibet. See their real life together.",
  image:'../../../online-zoo/assets/images/panda3.png',
  link:'../../../online-zoo/pages/zoos/panda.html'
  },
  {name:"Alligator",
  description:"The broadcast is from Florida. See their real life.",
  image:'../../../online-zoo/assets/images/croc2.png',
  link:'../../../online-zoo/pages/zoos/alligator.html'
  }
];

let animalCard=document.querySelector('.map-animal-card');
let animalCardName=document.querySelector('.map-animal-card__name');
let animalCardImage=document.querySelector('.map-animal-card__img');
let animalCardDescription=document.querySelector('.map-animal-card__text');
let animalCardLink=document.querySelector('.map-animal-card__watch-now');



zoogeographyAnimals.forEach((item)=>{
  item.addEventListener('click', switchAnimalCard);
})

function switchAnimalCard(e){
  if(animalCard.style.display!='flex'){
    animalCard.style.display='flex';
  }
  zoogeographyAnimals.forEach((item)=>{
    if(item.classList.contains('world-map__animal-active'))
      item.classList.toggle('world-map__animal-active');
    })

  e.currentTarget.classList.toggle('world-map__animal-active')

  let animal

  if(e.currentTarget.classList.contains("world-map__animal-panda")){
    animal="Panda"
  }else if(e.currentTarget.classList.contains("world-map__animal-eagle")){
    animal="Eagle"
  }else if(e.currentTarget.classList.contains("world-map__animal-gorilla")){
    animal="Gorilla"
  }else if(e.currentTarget.classList.contains("world-map__animal-alligator")){
    animal="Alligator"
  }
  
  animal=animalsList.find((item)=>{
    return item.name==animal?true:false
  })

  animalCardName.innerHTML=animal.name;
  animalCardImage.src=animal.image;
  animalCardDescription.innerHTML=animal.description;
  animalCardLink.href=animal.link;
}

let map = document.querySelector('.wrldmap');
map.addEventListener('click', twst)
function twst(e){
  if(e.currentTarget===map){
    animalCard.style.display='none';
  }
  zoogeographyAnimals.forEach((item)=>{
    if(item.classList.contains('world-map__animal-active'))
      item.classList.toggle('world-map__animal-active');
    })
}