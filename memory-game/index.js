const tiles = document.getElementById('tiles');
const startButton = document.getElementById('start-button');
const currentScore = document.getElementById('current-score');
const highScore = document.getElementById('high-score');
const boxSize = 5;
let highScoreBrowser = Number(localStorage.getItem('high-score'));
let sequenceLength = 0;
let score = 0;
let sequenceArray = [];
initializeGame();
function initializeGame() {
    if(highScoreBrowser == null) {
        localStorage.setItem('high-score', 0);
        highScoreBrowser = 0;
    }
    updateHighScore(0);
    const fragment = document.createDocumentFragment();
    for(let j=0; j<boxSize; j++) {
        const element = document.createElement('div');
        element.classList.add('tile');
        element.id = j;
        fragment.appendChild(element);
    }
    tiles.appendChild(fragment);
}

function getRandomNumber(num) {
return Math.floor(Math.random()*num);
}
function getSequenceArray(length) {
    let sequenceArray = [];
    for(let j = 0; j < length; j++) {
        sequenceArray.push(getRandomNumber(5));
    }
    return sequenceArray;
}
startButton.addEventListener(('click'), async function(){
    startButton.disabled = true;
    sequenceArray = [];
    score = 0;
    updateCurrentScore(score);
    sequenceLength = 1;
    const tiles = document.querySelectorAll('.tile');
    console.log('tiles', tiles);
    while(true) {
        sequenceArray = getSequenceArray(sequenceLength);
        let interalTimes = 0;
        let breakFromLoop = false; 
        console.log('sequence', sequenceArray, interalTimes);
        let timerId = setInterval(()=> {
            interalTimes++;
            console.log('intervalTimes', interalTimes, sequenceArray.length);
            if(interalTimes > sequenceArray.length) {
                clearInterval(timerId);
            }
            else {
                tiles[sequenceArray[interalTimes-1]].style.backgroundColor = 'blue';
                setTimeout(()=> {
                    tiles[sequenceArray[interalTimes-1]].style.backgroundColor = 'lightgray';
                }, 1000);
            }
        },1200);
        await new Promise((resolve, reject)=> {
            const allTiles = document.getElementById('tiles');
            let flag = 0;
            let index = 0;
            allTiles.addEventListener('click', (event)=> {
                if((flag === 0) && (interalTimes === sequenceArray.length + 1)) {
                    flag = 1;
                    let selectedId = Number(event.target.id);
                    console.log('clicked', this, event.target.id);
                    if(selectedId !== sequenceArray[index]) {
                        breakFromLoop = true;
                        tiles[selectedId].style.backgroundColor = 'red';
                        setTimeout(()=> {
                            flag = 0;
                            tiles[selectedId].style.backgroundColor = 'lightgray';
                            resolve();
                        }, 600);
                    }
                    else {
                        tiles[selectedId].style.backgroundColor = 'blue';
                        setTimeout(()=> {
                            flag = 0;
                            tiles[selectedId].style.backgroundColor = 'lightgray';
                        }, 600);
                    }   
                    index++;
                    if(index === sequenceArray.length) {
                        resolve();
                    }  
                }
            });
        });
        if(breakFromLoop) {
            sequenceLength = 0;
            sequenceArray = []; 
            startButton.disabled = false;
            updateHighScore(score);
            score = 0;
            updateCurrentScore(score);

            document.getElementById('tiles').classList.toggle('shake');
            setTimeout(()=> {
                document.getElementById('tiles').classList.toggle('shake');
            }, 600);
            break;
        }
        else {
            score++;
            updateCurrentScore(score);
            sequenceLength++;
        }
    }
});

function updateCurrentScore(score) {
    currentScore.innerHTML = 'Score : ' + score;
}

function updateHighScore(score) {
    if(score > highScoreBrowser) {
     localStorage.setItem('high-score', score);
     highScoreBrowser = score;
    }
    highScore.innerHTML = 'High Score : ' +  highScoreBrowser;
}
