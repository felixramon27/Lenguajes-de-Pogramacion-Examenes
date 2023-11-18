function F_recursive(n, alpha, beta) {
  if (n < alpha * beta) {
    return n;
  } else {
    let sum = 0;
    for (let i = 1; i <= alpha; i++) {
      sum += F_recursive(n - beta * i, alpha, beta);
    }
    return sum;
  }
}

function F_tail_recursive(n, alpha, beta, acc = 0) {
  if (n < alpha * beta) {
    return n + acc;
  } else {
    let sum = 0;
    for (let i = 1; i <= alpha; i++) {
      sum += n - beta * i;
    }
    return F_tail_recursive(n - beta, alpha, beta, acc + sum);
  }
}

function F_iterative(n, alpha, beta) {
  let result = 0;
  while (n >= alpha * beta) {
    let sum = 0;
    for (let i = 1; i <= alpha; i++) {
      sum += n - beta * i;
    }
    result += sum;
    n -= beta;
  }
  return result + n;
}

// Probando la funcionalidad de las funciones
// let n = 10;
// let alpha = 6;
// let beta = 4;

// console.log(F_recursive(n, alpha, beta));
// console.log(F_tail_recursive(n, alpha, beta));
// console.log(F_iterative(n, alpha, beta));

let alpha = 6;
let beta = 4;
let times_recursive = [];
let times_tail_recursive = [];
let times_iterative = [];

for (let n = 0; n <= 130; n += 10) {
  console.log("Valor de n", n);
  console.time("recursive");
  F_recursive(n, alpha, beta);
  console.timeEnd("recursive");

  console.time("tail_recursive");
  F_tail_recursive(n, alpha, beta);
  console.timeEnd("tail_recursive");

  console.time("iterative");
  F_iterative(n, alpha, beta);
  console.timeEnd("iterative");
}
