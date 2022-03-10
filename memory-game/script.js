const cardArray =[
    {
        name: "cat-1",
        img: "images/cat-1.png",
    },
    {
        name: "cat-2",
        img: "images/cat-2.png",
    },
    {
        name: "cat-3",
        img: "images/cat-3.png",
    },
    {
        name: "cat-4",
        img: "images/cat-4.png",
    },
    {
        name: "dog-1",
        img: "images/dog-1.png",
    },
    {
        name: "dog-2",
        img: "images/dog-2.png",
    },
    {
        name: "dog-3",
        img: "images/dog-3.png",
    },
    {
        name: "dog-4",
        img: "images/dog-4.png",
    },
    {
        name: "cat-1",
        img: "images/cat-1.png",
    },
    {
        name: "cat-2",
        img: "images/cat-2.png",
    },
    {
        name: "cat-3",
        img: "images/cat-3.png",
    },
    {
        name: "cat-4",
        img: "images/cat-4.png",
    },
    {
        name: "dog-1",
        img: "images/dog-1.png",
    },
    {
        name: "dog-2",
        img: "images/dog-2.png",
    },
    {
        name: "dog-3",
        img: "images/dog-3.png",
    },
    {
        name: "dog-4",
        img: "images/dog-4.png",
    }
]

cardArray.sort(() => 0.5 - Math.random());

const grid = document.getElementById('grid');

function createBoard(){
    cardArray.forEach((elem,index) =>{       
        const frontCard = document.createElement('img');
        frontCard.setAttribute('src','images/blank.png');
        frontCard.setAttribute('id','frontcard');

        const backCard = document.createElement('img');
        backCard.setAttribute('src',elem['img']);
        backCard.setAttribute('id','backcard');

        const theCard = document.createElement('div');
        theCard.setAttribute('id','thecard');
        theCard.setAttribute('data-id',index);
        theCard.appendChild(frontCard);
        theCard.appendChild(backCard);
        theCard.addEventListener('click',flipCard);

        grid.appendChild(theCard);
    })
}

createBoard();
let cardsChossen = [];
let cardsChossenIds = [];
let pairWon = 0;
let result = document.getElementById('result');
let button = document.getElementById('again');

function flipCard(){
    this.style.transform = "rotateY(180deg)";
    this.removeEventListener("click",flipCard);

    const id = this.getAttribute('data-id');
    cardsChossen.push(cardArray[id]);
    cardsChossenIds.push(id);

    if(cardsChossen.length === 2 ){
        setTimeout(() => {
            const cards = document.querySelectorAll('div#thecard');
            console.log(cardsChossen);
            if(cardsChossen[0].name === cardsChossen[1].name){
                cards[cardsChossenIds[0]].style.transform = "scale(0)";
                cards[cardsChossenIds[1]].style.transform = "scale(0)";
                pairWon++;
            } else {
                cards[cardsChossenIds[0]].style.transform = "";
                cards[cardsChossenIds[0]].addEventListener('click',flipCard);
                cards[cardsChossenIds[1]].style.transform = "";
                cards[cardsChossenIds[1]].addEventListener('click',flipCard);
            }
            cardsChossen = [];
            cardsChossenIds = [];

            if(pairWon == cardArray.length/2){
                result.innerHTML = "YOU WON!!!";
                button.style.display = "flex";
                document.getElementById('notice').style.display = "none";
            }
        },400)
    }
}
function reload(){
    location.reload();
}
