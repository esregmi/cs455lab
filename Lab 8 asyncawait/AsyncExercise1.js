
async function isPrime(num) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            for (let i = 2, s = Math.sqrt(num); i <= s; i++)
                if (num % i === 0) reject({ prime: false });
            resolve({ prime: num > 1 });
        }, 500);
    });
}

async function isPrimeAsync(num) {
    let res = await isPrime(num);
    console.log(res);
}

console.log('start');
isPrimeAsync(5)
console.log('end');