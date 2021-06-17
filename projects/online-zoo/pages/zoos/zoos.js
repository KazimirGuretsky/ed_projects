let mainCam=document.querySelector('.translation-video iframe');
let otherCams=document.querySelectorAll('.other-cams__list-elem')

otherCams.forEach((item)=>{
  item.addEventListener('click', changeCam)
});

function changeCam(e){
  let temp= mainCam.src;
  mainCam.src= e.currentTarget.firstElementChild.src;
  e.currentTarget.firstElementChild.src=temp;
}

let factsButtons=document.querySelectorAll('.facts__list-elem-head-button');

factsButtons.forEach((item)=>{
  item.addEventListener('click', switchFacts)
});

function switchFacts(e){
  let fact=e.currentTarget.parentElement.nextElementSibling;
  console.log(fact)
  if(fact.style.display!='none'){
    fact.style.display='none';
    e.currentTarget.innerHTML="+";
    e.currentTarget.parentElement.style.borderBottom='1px solid #D3D3D3';
    e.currentTarget.parentElement.style.color='#080029'
  }else{
    fact.style.display='block';
    e.currentTarget.innerHTML="—"
    e.currentTarget.parentElement.style.borderBottom='none';
    e.currentTarget.parentElement.style.color='#609fff'
  }
}

