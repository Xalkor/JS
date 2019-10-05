const textArea1 = document.getElementById('textArea1');
const textArea2 = document.getElementById('textArea2');
const textArea3 = document.getElementById('textArea3');
const textArea4 = document.getElementById('textArea4');
const textArea5 = document.getElementById('textArea5');

const runButton = document.getElementById('runButton');
const consoleList = document.getElementById('consoleList');

function findAllEqN(nums, n) {
  let tmp = [];
  for (let num of nums) {
    tmp.push({
      val: num,
      expression: '' + num
    });
  }
  let lexNums = lexoOrder(tmp);
  let s = new Set();
  for (let nums of lexNums) {
    equations(nums, s, n);
  }
  for (let eq of s) {
    print(eq);
  }
}

function equations(nums, s, n) {
  if (nums.length == 1) {
    //if (prevOp.func(acc, nums[0]) == 24)
    if (nums[0].val == n) {
      s.add(nums[0].expression + ' = ' + nums[0].val);
    }
  } else {
    for (let op of OPS) {
      for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
          if (i != j) {
            let tmp = [];
            for (let n = 0; n < nums.length; n++) {
              if (n != j && n != i) {
                tmp.push(nums[n]);
              }
            }
            let v = op.func(nums[i].val, nums[j].val);
            let e = '(' + nums[i].expression + op.char + nums[j].expression + ')';
            tmp.push({
              val: v,
              expression: e
            });
            equations(tmp, s, n);
          }
        }
      }
    }
  }
}

const OPS = [{
    char: '+',
    func: (a, b) => a + b,
    isCommutative: true
  },
  {
    char: '-',
    func: (a, b) => a - b,
    isCommutative: false
  },
  {
    char: '*',
    func: (a, b) => a * b,
    isCommutative: true
  },
  {
    char: '/',
    func: (a, b) => a / b,
    isCommutative: false
  }
];

runButton.onclick = (event) => {
  consoleList.innerHTML = "";
  let val1 = +textArea1.value.trim();
  let val2 = +textArea2.value.trim();
  let val3 = +textArea3.value.trim();
  let val4 = +textArea4.value.trim();
  let val5 = +textArea5.value.trim();

  vals = [val1, val2, val3, val4];
  //combinations(vals, OPS, 24);
  findAllEqN(vals, val5);
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
      if (vals[i].val < vals[i + 1].val) {
        largestI = i;
      }
    }

    // STEP 2
    let largestJ = -1;
    for (let j = 0; j < vals.length; j++) {
      if (vals[largestI] && vals[largestI].val < vals[j].val) {
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
  let tmp = c[c.length - 1];
  c[c.length - 1] = c[0];
  c[0] = tmp;
  return c;
}

// function combinations(vals, ops, eq) {
//   let lexoVals = lexoOrder(vals);
//   for (let vals of lexoVals) {
//     for (let i = 0; i < ops.length; i++) {
//       for (let j = 0; j < ops.length; j++) {
//         for (let k = 0; k < ops.length; k++) {
//           let value = ops[k].func(ops[j].func(ops[i].func(vals[0], vals[1]), vals[2]), vals[3]);
//           let s = ('(((' + vals[0] + ' ' + ops[i].char + ' ' + vals[1] + ') ' + ops[j].char + ' ' + vals[2] + ') ' + ops[k].char + ' ' + vals[3] + ') = ' + value);
//           if (eq == value) print(s);
//         }
//       }
//     }
//   }
// }

function print(x) {
  let li = document.createElement("LI");
  let textnode = document.createTextNode(x);
  li.appendChild(textnode);
  consoleList.appendChild(li);
}