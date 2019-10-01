const textArea = document.getElementById('textArea');
const runButton = document.getElementById('runButton');
const consoleList = document.getElementById('consoleList');

const OPS = [{
    char: '+',
    func: (a, b) => a + b
  },
  {
    char: '-',
    func: (a, b) => a - b
  },
  {
    char: '*',
    func: (a, b) => a * b
  },
  {
    char: '/',
    func: (a, b) => a / b
  }
];

runButton.onclick = (event) => {
  consoleList.innerHTML = "";
  let vals = textArea.value.trim().split(' ');
  vals = [+vals[0], +vals[1], +vals[2], +vals[3]];
  combinations(vals, OPS, 24);
  if (consoleList.innerHTML == "") print('No Solutions');
};

function copy(arr) {
  let ret = new Array(arr.length);
  for (let i = 0; i < arr.length; i++)
    ret[i] = arr[i];
  return ret;
}

function lexoOrder(vals) {
  let c = [];
  let largestI = Infinity;

  while (largestI >= 0) {
    largestI = -1;
    for (let i = 0; i < vals.length - 1; i++) {
      if (vals[i] < vals[i + 1]) {
        largestI = i;
      }
    }

    // STEP 2
    let largestJ = -1;
    for (let j = 0; j < vals.length; j++) {
      if (vals[largestI] < vals[j]) {
        largestJ = j;
      }
    }

    // STEP 3
    let tmp = vals[largestI];
    vals[largestI] = vals[largestJ];
    vals[largestJ] = tmp;

    // STEP 4: reverse from largestI + 1 to the end
    let endArray = vals.splice(largestI + 1);
    endArray.reverse();
    vals = vals.concat(endArray);

    c.push(copy(vals));
  }

  return c;
}

function combinations(vals, ops, eq) {
  let lexoVals = lexoOrder(vals);
  for (let vals of lexoVals) {
    for (let i = 0; i < ops.length; i++) {
      for (let j = 0; j < ops.length; j++) {
        for (let k = 0; k < ops.length; k++) {
          let value = ops[k].func(ops[j].func(ops[i].func(vals[0], vals[1]), vals[2]), vals[3]);
          let s = ('(((' + vals[0] + ' ' + ops[i].char + ' ' + vals[1] + ') ' + ops[j].char + ' ' + vals[2] + ') ' + ops[k].char + ' ' + vals[3] + ') = ' + value);
          if (eq == value) print(s);
        }
      }
    }
  }
}

function print(x) {
  let li = document.createElement("LI");
  let textnode = document.createTextNode(x);
  li.appendChild(textnode);
  consoleList.appendChild(li);
}