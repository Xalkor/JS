const boardDiv = document.getElementById('boardDiv');

const colors = ['white', 'gray', 'black'];

let whiteAxis = '0123456789X'.split('');
let grayAxis  = whiteAxis;//'1,2,3,4,5,6,7,8,9,χ,↋'.split(',');
let blackAxis = whiteAxis;//'αβγδεζηθικλ'.split('');

let g = 0;
let boardMap;
let allPieces = [];

function mod(n, m) {
    return ((n % m) + m) % m;
}

function fill(j, n, color, care) {
    console.log(color);
    let spacers = Math.ceil((11 - care) / 2);
    let rSpacers = Math.floor((11 - care) / 2);
    for(let i = 0; i < n; i++) {
        let boardCell = document.createElement('div');
        if(i >= spacers && i < spacers+care) {
            boardCell.classList.add(`${colors[(color+i) % 3]}-board`);
            let piece = document.createElement('div');
            
            let q = Math.floor((i-5) - ((j-5) - (mod(j,2))) / 2);
            let r = j-5;
            let s = -q-r;

            console.log(`${q} ${r} ${s}`);

            let blackIndex = blackAxis[Math.max(Math.abs(q+5), Math.abs(r), Math.abs(s-5))];
            let grayIndex = grayAxis[Math.max(Math.abs(q-5), Math.abs(r+5), Math.abs(s))];
            let whiteIndex = whiteAxis[Math.max(Math.abs(q), Math.abs(r-5), Math.abs(s+5))];

            let obj = { 
                elt: boardCell,
                hex: piece
            };

            boardMap[`${whiteIndex}${grayIndex}${blackIndex}`] = obj;
            allPieces.push(obj);

            // let d1 = j;
            // let d2 = 11 - j - 1;
            // let d3 = i-spacers;
            // let d4 = spacers+care - i - 1;

            // let d = 5 - Math.min(d1,d2,d3,d4);

            //piece.innerText = `${letter}${num}${greek}`//`${q} ${r} ${s}`//`${g++}: ${rank} ${file} ${line}`;
            //piece.classList.add(`${colors[(color+i+1) % 3]}-piece`);
            let whitePos = document.createElement('span');
            whitePos.classList.add('white-label');
            whitePos.classList.add('label');
            whitePos.innerText = whiteIndex;
            whitePos.style.setProperty('--a', '240deg');

            let grayPos = document.createElement('span');
            grayPos.classList.add('gray-label');
            grayPos.classList.add('label');
            grayPos.innerText = grayIndex;
            grayPos.style.setProperty('--a', '120deg');

            let blackPos = document.createElement('span');
            blackPos.classList.add('black-label');
            blackPos.classList.add('label');
            blackPos.innerText = blackIndex;
            blackPos.style.setProperty('--a', '0deg');

            piece.appendChild(whitePos);
            piece.appendChild(grayPos);
            piece.appendChild(blackPos);
            
            boardCell.appendChild(piece);

            g++;
        }
        boardDiv.appendChild(boardCell);
    }
}

let setup = [
    { index: '0XX', pieceHTML:bishopHTML, color:0 },
    { index: '199', pieceHTML:bishopHTML, color:0 },
    { index: '288', pieceHTML:bishopHTML, color:0 },

    { index: '3X7', pieceHTML:pawnHTML, color:0 },
    { index: '397', pieceHTML:pawnHTML, color:0 },
    { index: '387', pieceHTML:pawnHTML, color:0 },
    { index: '377', pieceHTML:pawnHTML, color:0 },
    { index: '378', pieceHTML:pawnHTML, color:0 },
    { index: '379', pieceHTML:pawnHTML, color:0 },
    { index: '37X', pieceHTML:pawnHTML, color:0 },

    { index: '28X', pieceHTML:rookHTML, color:0 },
    { index: '2X8', pieceHTML:rookHTML, color:0 },

    { index: '289', pieceHTML:knightHTML, color:0 },
    { index: '298', pieceHTML:knightHTML, color:0 },

    { index: '1X9', pieceHTML:queenHTML, color:0 },
    { index: '19X', pieceHTML:kingHTML, color:0 },



    { index: 'X0X', pieceHTML:bishopHTML, color:1 },
    { index: '919', pieceHTML:bishopHTML, color:1 },
    { index: '828', pieceHTML:bishopHTML, color:1 },

    { index: 'X37', pieceHTML:pawnHTML, color:1 },
    { index: '937', pieceHTML:pawnHTML, color:1 },
    { index: '837', pieceHTML:pawnHTML, color:1 },
    { index: '737', pieceHTML:pawnHTML, color:1 },
    { index: '738', pieceHTML:pawnHTML, color:1 },
    { index: '739', pieceHTML:pawnHTML, color:1 },
    { index: '73X', pieceHTML:pawnHTML, color:1 },

    { index: '82X', pieceHTML:rookHTML, color:1 },
    { index: 'X28', pieceHTML:rookHTML, color:1 },

    { index: '829', pieceHTML:knightHTML, color:1 },
    { index: '928', pieceHTML:knightHTML, color:1 },

    { index: '91X', pieceHTML:queenHTML, color:1 },
    { index: 'X19', pieceHTML:kingHTML, color:1 },


    { index: 'XX0', pieceHTML:bishopHTML, color:2 },
    { index: '991', pieceHTML:bishopHTML, color:2 },
    { index: '882', pieceHTML:bishopHTML, color:2 },

    { index: 'X73', pieceHTML:pawnHTML, color:2 },
    { index: '973', pieceHTML:pawnHTML, color:2 },
    { index: '873', pieceHTML:pawnHTML, color:2 },
    { index: '773', pieceHTML:pawnHTML, color:2 },
    { index: '783', pieceHTML:pawnHTML, color:2 },
    { index: '793', pieceHTML:pawnHTML, color:2 },
    { index: '7X3', pieceHTML:pawnHTML, color:2 },

    { index: '8X2', pieceHTML:rookHTML, color:2 },
    { index: 'X82', pieceHTML:rookHTML, color:2 },

    { index: '892', pieceHTML:knightHTML, color:2 },
    { index: '982', pieceHTML:knightHTML, color:2 },

    { index: 'X91', pieceHTML:queenHTML, color:2 },
    { index: '9X1', pieceHTML:kingHTML, color:2 },

];

let html = document.querySelector("html");

function refreshBoard() {
    
    for(let piece of allPieces) {
        if(piece.svg) {
            let fillCol = getComputedStyle(html).getPropertyValue(`--p-${colors[piece.color]}`);
            let strokeCol = getComputedStyle(html).getPropertyValue(`--p-${colors[piece.color]}-stroke`);

            piece.svg.innerHTML = piece.pieceHTML(fillCol, strokeCol);
            // console.log(piece.pieceHTML(fillCol, strokeCol));
        }
    }
}

function main() {
    let pieceThemePicker = document.getElementById('pieceThemePicker');
    let boardThemePicker = document.getElementById('boardThemePicker');
    let boardAnglePicker = document.getElementById('boardAnglePicker');

    let mainDiv = document.getElementById('mainDiv');
    let rotatePiecesCheck = document.getElementById('rotatePiecesCheck');
    let labelAlphaSlider = document.getElementById('labelAlphaSlider');

    pieceThemePicker.onchange = event => {
        console.log(pieceThemePicker.value);
        html.classList.remove(...html.classList);
        html.classList.add(`piece-theme-${pieceThemePicker.value}`);
        html.classList.add(`board-theme-${boardThemePicker.value}`);
        refreshBoard();
    };
    boardThemePicker.onchange = event => {
        console.log(pieceThemePicker.value);
        html.classList.remove(...html.classList);
        html.classList.add(`piece-theme-${pieceThemePicker.value}`);
        html.classList.add(`board-theme-${boardThemePicker.value}`);
        refreshBoard();
    };
    boardAnglePicker.onchange = event => {
        console.log(boardAnglePicker.value);
        mainDiv.style.setProperty('--main-rot', `${+boardAnglePicker.value}deg`);
    };
    rotatePiecesCheck.onchange = event => {
        console.log(rotatePiecesCheck.checked);
        for(let peice of allPieces) {
            if(peice.svg) {
                if(rotatePiecesCheck.checked) {
                    peice.svg.classList.add('rotate-pieces');
                } else {
                    peice.svg.classList.remove('rotate-pieces');
                }
            }
        }
    };
    labelAlphaSlider.oninput = event => {
        mainDiv.style.setProperty('--alpha', `${(+labelAlphaSlider.value) / 100}`);
    };


    boardMap = {};
    let lens = [6,7,8,9,10,11,10,9,8,7,6];
    for(let i = 0; i < 11; i++)
        fill(i, 11, 2 * (i%2), lens[i]);


    for(let data of setup) {
        let color = data.color;
        let index = data.index;
        let pieceHTML = data.pieceHTML;
        
        let pieceSVG = document.createElement('span');
        pieceSVG.classList.add('piece');
        pieceSVG.classList.add(`${colors[color]}-piece`);

        let fillCol = getComputedStyle(html).getPropertyValue(`--p-${colors[color]}`);
        let strokeCol = getComputedStyle(html).getPropertyValue(`--p-${colors[color]}-stroke`);
        pieceSVG.innerHTML = pieceHTML(fillCol, strokeCol);

        boardMap[index].hex.appendChild(pieceSVG);
        boardMap[index].pieceHTML = pieceHTML;
        boardMap[index].svg = pieceSVG;
        boardMap[index].color = color;
    }

}

function updateCustom(prop, val) {
    html.style.setProperty(prop, val);
    refreshBoard();
}

let customs = "whitePieceColor,grayPieceColor,blackPieceColor,whiteStrokeColor,grayStrokeColor,blackStrokeColor,backgroundColor,whiteHexColor,grayHexColor,blackHexColor,menuColor".split(',');

function copyQuickCode() {
    let out = "";
    for(let custom of customs) {
        out += document.getElementById(custom).value.substring(1);
    }
    window.prompt("Save this code to be able to quickly load this theme in the future", out);
}

function loadQuickLoad(code) {
    if(code.length / 6 != customs.length) {
        return;
    }

    for(let i = 0; i < customs.length; i ++) {
        document.getElementById(customs[i]).value = '#' + code.substring(i*6, i*6+6);
        document.getElementById(customs[i]).oninput();
        // console.log(code.substring(i*6, i*6+6));
    }

    pieceThemePicker.value = 'custom';
    pieceThemePicker.onchange();
    boardThemePicker.value = 'custom';
    boardThemePicker.onchange();

    document.getElementById('inputQuickCode').value = '';
}

//terrible theme: ff0000ffdd00ff8aa73f993861146cff8c2e3660dd00ff08ffffff757575ff05c9