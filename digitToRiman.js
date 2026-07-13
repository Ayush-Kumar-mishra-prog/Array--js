/*------Digits to Roman number convert program ----*/

function intToRoman(num) {
    const roman = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"]
    ];

    let result = "";

    for (let i = 0; i < roman.length; i++) {
        while (num >= roman[i][0]) {
            result += roman[i][1];
            num -= roman[i][0];
        }
    }

    return result;
}

console.log(intToRoman(3749)); 
console.log(intToRoman(58));   
console.log(intToRoman(1994)); 