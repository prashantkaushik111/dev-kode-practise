const gameTable = document.getElementById('game-table');
const scoreHeading = document.getElementById('score');
let size = 4, score = 0;
let firstColor;

gameTable.addEventListener('click', (event)=> {
    console.log('clicked', this, event.target.style.backgroundColor, firstColor);
    if(firstColor === event.target.style.backgroundColor) {
        size++;
        score++;
        scoreHeading.innerHTML = 'Score : ' + score;
        console.log('matched', size);
        initializeTable(size);
    }
    else {
        size = 4;
        score = 0;
        scoreHeading.innerHTML = 'Score : ' + score;
        gameTable.classList.toggle('shake');
        setTimeout(()=> {
            gameTable.classList.toggle('shake');
            initializeTable(size);
        }, 800);
    }
});
const getRandomColors = function(){
    var ratio = 0.618033988749895;
    
    var hue = (Math.random() + ratio) % 1;
    var saturation = Math.round(Math.random() * 100) % 85;
    var lightness = Math.round(Math.random() * 100) % 85;

    var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
    var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

    return {
        color,
        oddColor
    }
}

function getRandomNumber(num) {
    return Math.floor(Math.random()*num);
}
function initializeTable(size) {
    gameTable.innerHTML = "";
    const {color, oddColor} = getRandomColors();
    console.log('colors', color, oddColor);
    const oddIndex = getRandomNumber(size*size);
    let index = 0;
    const fragment = document.createDocumentFragment();

    for(let j=0; j < size; j++) {
        const row = document.createElement('tr');
        for(let i=0; i < size; i++) {
            let columnColor;
            const col = document.createElement('td');
            if(index === oddIndex) {
                columnColor = oddColor;
                col.style.backgroundColor = columnColor;
                firstColor = col.style.backgroundColor;
            }
            else {
                columnColor = color;
                col.style.backgroundColor = columnColor;
            }
            row.appendChild(col);
            index++;
        }
        fragment.appendChild(row);
    }
    gameTable.appendChild(fragment);
}
initializeTable(size);
