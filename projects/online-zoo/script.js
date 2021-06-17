let petCards=document.querySelectorAll('.pet-card');
let petCardsButtons=document.querySelectorAll('.famous-pets__buttons');

petCardsButtons.forEach((item)=>{
  item.addEventListener('click', petCardsCarousel)
})

let petCardsOrder=[];
for(let i=0;i<petCards.length;i++){
  petCardsOrder.push(i);
}

function petCardsCarousel(e){
  petCardOrder=petCardsOrder.reverse();
    petCards.forEach((item,i)=>{
        item.style.order=`${petCardsOrder[i]}`
    })
}

let testimonialsReviews=document.querySelectorAll('.review');
let testimonialsReviewsButtons=document.querySelectorAll('.testimonials-reviews__buttons');


let testimonialsReviewsOrder=[];
for(let i=0;i<testimonialsReviews.length;i++){
  testimonialsReviewsOrder.push(i);
}


let timerInterval = setInterval(reviewsCarousel, 10000);
let timeoutTimer

testimonialsReviewsButtons.forEach((item)=>{
  item.addEventListener('click', changeReview);
})
testimonialsReviews.forEach((item)=>{
  item.addEventListener('click', changeReview);
})

function changeReview(e){
  if(!e.currentTarget.classList.contains('review')){
    reviewsCarousel();
  }
    clearInterval(timerInterval);
    timerInterval = setInterval(reviewsCarousel,20000);
    
    clearTimeout(timeoutTimer)
    timeoutTimer=setTimeout(()=>{
      clearInterval(timerInterval);
      timerInterval = setInterval(reviewsCarousel, 10000);
    },20000)
}

function reviewsCarousel(e){
  testimonialsReviewsOrder=testimonialsReviewsOrder.reverse();
    testimonialsReviews.forEach((item,i)=>{
        item.style.order=`${testimonialsReviewsOrder[i]}`
    })
}

let leaveFeedbackButton=document.querySelector('.testimonials-info__feedback-button')
let formBlock=document.querySelector('.review-popup-wrapper');

leaveFeedbackButton.addEventListener('click', leaveFeedbackSwitcher);
formBlock.addEventListener('click', leaveFeedbackSwitcher);

function leaveFeedbackSwitcher(e){
  if(e.target==formBlock || e.target==leaveFeedbackButton){
    if(formBlock.style.display!='block'){
      document.body.style.overflow = 'hidden';
      formBlock.style.display='block';
    }else{
      document.body.style.overflow = 'auto';
      formBlock.style.display='none';
    }
  }
}

let zoogeographyAnimals=document.querySelectorAll('.world-map__animal');

let animalsList=[
  {name:"Eagle",
  description:"The broadcast is from an island near Los Angeles. Watch their real life.",
  image:'../online-zoo/assets/images/eagle2.png',
  link:'../online-zoo/pages/zoos/eagle.html'
  },
  {name:"Gorilla",
  description:"The broadcast comes from the Democratic Republic of the Congo in a forest area. Watch their life and life together.",
  image:'../online-zoo/assets/images/gorilla2.png',
  link:'../online-zoo/pages/zoos/gorilla.html'
  },
  {name:"Panda",
  description:"The broadcast comes from the mountainous regions of central China: Sichuan and Tibet. See their real life together.",
  image:'../online-zoo/assets/images/panda3.png',
  link:'../online-zoo/pages/zoos/panda.html'
  },
  {name:"Alligator",
  description:"The broadcast is from Florida. See their real life.",
  image:'../online-zoo/assets/images/croc2.png',
  link:'../online-zoo/pages/zoos/alligator.html'
  }
]

let animalCardName=document.querySelector('.map-animal-card__name');
let animalCardImage=document.querySelector('.map-animal-card__img');
let animalCardDescription=document.querySelector('.map-animal-card__text');
let animalCardLink=document.querySelector('.map-animal-card__watch-now');



zoogeographyAnimals.forEach((item)=>{
  item.addEventListener('click', switchAnimalCard);
})

function switchAnimalCard(e){
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
