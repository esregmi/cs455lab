Array.prototype.removeDuplicatesAsync = async function() {
    let arr = this;
    console.log(await [...new Set(arr)]);
}
console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
console.log(`end`);