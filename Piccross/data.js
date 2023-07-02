let boards = {
  
  'hearts': fromData([
      "303033232",
      "000003323",
      "000003333",
      "300033333",
      "330333333",
      "333311311",
      "333311111",
      "232331113",
      "323333133",
    ], '3', ['#861737', '#984A64', '#4F324D','#1C90DD']),
  
  'flamingo': fromData([
      "011100000000000",
      "111110000000000",
      "100110000000000",
      "000111000000000",
      "001111100000000",
      "011111111110000",
      "011111111110000",
      "011111111111000",
      "001111110011100",
      "000001100001010",
      "222221212222122",
      "222221221222222",
      "222111111122222",
      "222221222222222",
      "222221222222222",
    ], '02', ['#90C5CC','#C67A81','#1C90DD']),
  
  'otter': fromData([
      "..111..........".replaceAll('.','0'),
      ".12231.....66..".replaceAll('.','0'),
      "1222221.66...6.".replaceAll('.','0'),
      "1323221...66..6".replaceAll('.','0'),
      "122233415...6.6".replaceAll('.','0'),
      ".122344445...6.".replaceAll('.','0'),
      "..144422445..6.".replaceAll('.','0'),
      "..1445525451..6".replaceAll('.','0'),
      ".6.5444525541.6".replaceAll('.','0'),
      ".6..555222245..".replaceAll('.','0'),
      "..6..14422252..".replaceAll('.','0'),
      "6..6..1445445..".replaceAll('.','0'),
      "6...66.1525221.".replaceAll('.','0'),
      ".6.........1221".replaceAll('.','0'),
      "..66........111".replaceAll('.','0'), 
    ], '06', ['#1C90DD','#795548','#A57D6F', '#39322F', '#905E4C', '#623E08', '#97B7CC']),
}

function fromData(data, blanks, doneColors) {
  let cols = genCols(data, blanks);
  let rows = genRows(data, blanks);
  return {
    data, cols, rows, doneColors,
    maxExt: genMaxExt(cols, rows)
  }
}

function genCols(grid, blanks) {
  let cols = [];
  for(let col = 0; col < grid.length; col++) {
    let runs = genColRuns(grid, col, blanks);
    cols.push(runs);
  }
  return cols;
}

function genColRuns(grid, col, blanks) {
  let runs = [];
  let run = 0;
  for(let row = 0; row < grid.length; row++) {
    if( blanks.indexOf(grid[row][col]) >= 0 ) {
      if(run == 0) continue;
      runs.push(run);
      run = 0;
    } else {
      run++;
    }
  }
  if(run != 0) runs.push(run);
  return runs
}

function genRowRuns(grid, row, blanks) {
  let runs = [];
  let run = 0;
  for(let col = 0; col < grid.length; col++) {
    if( blanks.indexOf(grid[row][col]) >= 0 ) {
      if(run == 0) continue;
      runs.push(run);
      run = 0;
    } else {
      run++;
    }
  }
  if(run != 0) runs.push(run);
  return runs;
}

function genRows(grid, blanks) {
  let rows = [];
  for(let row = 0; row < grid.length; row++) {
    let runs = genRowRuns(grid, row, blanks);
    rows.push(runs);
  }
  return rows;
}

function genMaxExt(a,b) {
  return Math.max(
    Math.max(...(a.map(l=>l.length))),
    Math.max(...(b.map(l=>l.length)))
  );
}