/* shuffle function returns the deck of shuffled cards*/

function shuffle(icons2){
    var currentIndex = icons2.length, temporaryValue, randomIndex;                             
        while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons2[currentIndex];
        icons2[currentIndex] = icons2[randomIndex];
        icons2[randomIndex] = temporaryValue;
        }            
    return icons2;
}

function newCards (newOne){
    let aaa =  `<li class = "card"><i class = "${newOne}"></i></li>`;                                                                
    return aaa;                                             
}                                                              

function buildLayout(shuffledCards){
    const newDeck = document.querySelector('.deck');       
    const cardIcons = shuffledCards.map(function(newIcons){
        return newCards(newIcons);                               
    });                                                                                                           
    newDeck.innerHTML = cardIcons.join('');                        
}       

function movesUpdate(){
    move += 1;
    countOfMoves = document.querySelector('.moves');
    countOfMoves.innerHTML = move;                                                   
        if (move === 1){                                                
            startTime();        
        }
    starsUpdate();                                    
}

function starsUpdate(){                                
    if (move >= 25){
        starsCount[starsCount.length-1].style.display = 'none';        
    }
    if (move >= 35){
        starsCount[starsCount.length-2].style.display = 'none';
    }
}

function startTime(){                                                                    
    stopWatch = setInterval(()=>{                                                                   
        time += 1;
        timerDisplay();                                                                  
    },1000);
}
                                                             
function timerDisplay (){
    const clockTimer = document.querySelector('.timer');                                                
    const minutes = Math.floor(time/60);      
    const seconds = time % 60;                                             
        if(seconds<10){
            clockTimer.innerHTML = `${minutes}:0${seconds}`;
        }
        else{
            clockTimer.innerHTML = `${minutes}:${seconds}`;
        }                                                    
}

function stopTime(){
    clearInterval (stopWatch);                                                        
    return time;                                        
}

function modalStarDisplay(){
    starRating = 0;
        for (star of starsCount){
            if(star.style.display !== 'none'){
            starRating ++;
            }
        }                
    return starRating;
}

function modalToggle(){
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hide');
}

function clckModal(){
    document.querySelector('.modal-replay').addEventListener ('click',()=>{
        modalToggle();                                                   
    });
}

function modalDisplay(){
    const timeUpdate = document.querySelector('.modal-duration');                                                                               
    const updatedClock = document.querySelector('.timer').innerHTML;                                                        
    const movesDisplay = document.querySelector('.modal-moves');
    const starDisplay = document.querySelector('.modal-stars');
    const stars = modalStarDisplay();
    timeUpdate.innerHTML = `Duration = ${updatedClock}`;                                                        
    movesDisplay.innerHTML = `Moves = ${move+1}`;
    starDisplay.innerHTML = `Stars = ${stars}`;

    clckModal();
}

/*replay game function*/
function resetGame(){
    resetTimer();
    resetMoves();
    resetStars();
    buildLayout(shuffle(icons));
    crdclck();    
    clckModal();    
}

function resetTimer(){
    stopTime();
    time = 0;
    timerDisplay();                                                        
}

function resetMoves(){
    move = 0;
    document.querySelector('.moves').innerHTML = move;                                                        
}

function resetStars(){
    starRating = 0;
        for (star of starsCount){
        star.style.display = 'inline';
        }                                                        
}

/*function res() to reset game*/
function res(){
    document.querySelector('.restart').addEventListener('click', resetGame);
    document.querySelector('.modal-replay').addEventListener('click', resetGame);
}

function cardMatch(selCards){
    selCards[0].classList.add('match', 'disabled');
    selCards[1].classList.add('match', 'disabled');

    while (selCards.length) {
        selCards.pop();
    } 
                  
}

function unmatchCards(umCards){
    umCards[0].classList.add('unmatch');
    umCards[1].classList.add('unmatch');

    setTimeout(function turnCard() {
        umCards[0].classList.remove('unmatch','disabled');
        umCards[1].classList.remove('unmatch','disabled');
                
        umCards[0].classList.remove ('open','show');
        umCards[1].classList.remove ('open','show');

        while (umCards.length) {
            umCards.pop();
        } 
                                                                        
    },1000);

}

function crdclck(){
    let gameCards = document.querySelectorAll('.card');    
    //return list items contained within a list whose class is "card" 
    
    let selectedCards = [];  // declaring an empty array                                                      
    let counter = 0;    // initializing value of counter variable
    
    gameCards.forEach(function(gameCard,i){                            
        gameCard.addEventListener ('click', function(){   
            if(!gameCard.classList.contains('open') && !gameCard.classList.contains('show')){ 
                
                selectedCards.push(gameCard);   //checking if the cards are not open, then add the element into the array
        
                if(selectedCards.length <=2){
                    gameCard.classList.add ('open','show','disabled');
                }                                         
                if (selectedCards.length === 2){

                // checking if the cards match
                    if (selectedCards[0].firstElementChild.className === selectedCards[1].firstElementChild.className){
                        cardMatch(selectedCards); 
                        counter += 1;       //if two cards match, then increase counter variable by 1
                        if(counter === 8){      //if the 16 cards match, then stop the game and display the modal with the details
                            stopTime();
                            modalDisplay();
                            timerDisplay();
                            modalToggle();                                                 
                        }
                    }
                    else{
                        
                        unmatchCards(selectedCards);
                
                    }                    
                }                
            }
            if(selectedCards.length <=2){
                movesUpdate();           
            }
             
        });
    });
};

/*Array of strings, representing symbols of cards is assigned to variable named icons */
const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
"fa fa-bolt", "fa fa-cube", "fa fa-anchor","fa fa-leaf", 
"fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", 
"fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

const starsCount = document.querySelectorAll('.stars li');

let move = 0;
let time = 0;
let stopWatch;
                                              
/*calling shuffle function and passing icons as an argument.
* Then passing it as an argument of buildLayout function, which returns new deck of shuffled cards inserting values into the HTML deck element.
*/
buildLayout(shuffle(icons));
res();
crdclck();
modalToggle(); //calling modalToggle() function to show
modalToggle();  //calling modalToggle() function to hide