const fibonacciModule = (function () {

    let data = [];

    return {

        calculateFib(n) {

            if (data[n]) {

                return data[n];

            }

            else {

                if (n <= 1) {

                    return n;

                }

                data[n] = this.calculateFib(n - 1) + this.calculateFib(n - 2);

                return data[n];

            }

        }

    }

})()



function fibbo(n) {

    if (n <= 1) {

        return n;

    }

    return fibbo(n - 1) + fibbo(n - 2);

}



console.time("memoized")

console.log(fibonacciModule.calculateFib(45));

console.timeEnd("memoized")



console.time("Not memoized")

console.log(fibbo(45));

console.timeEnd("Not memoized")
