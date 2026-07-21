 let arr = [5,4,7,8]
let target= 13
let i = 0
let res = []
if(arr[i]+arr[i+1] === target){
let io = arr[i]
   let j = arr[i+1]
   res.push(io,j)
}else if(arr[i]+arr[i+2] === target){
let io = arr[i]
    let j = arr[i+2]
    res.push(io,j)
}else if(arr[i]+arr[i+3] === target){
    let io = arr[i]
    let j = arr[i+3]
    res.push(io,j)
}else{
    console.log("no")
}
console.log(res)


var twoSum = function(arr, target) {
    let res = []
    let i = 0
if(arr[i]+arr[i+1] === target){
let io = arr[i]
   let j = arr[i+1]
   res.push(io,j)
}else if(arr[i]+arr[i+2] === target){
let io = arr[i]
    let j = arr[i+2]
    res.push(io,j)
}else if(arr[i]+arr[i+3] === target){
    let io = arr[i]
    let j = arr[i+3]
    res.push(io,j)
}else{
    console.log("no addition found")
}
console.log(res)


};

let nums = [2,7,11,15]
let target = 9

twoSum(nums,target)


let fm;
const median = (num1,num2)=>{
    fnum = num1.concat(num2)
    console.log(fnum)
    if(fnum.length % 2 ===0){
        let l = fnum.length
        fm = (l/2+l/2+1)/2
        console.log(fm)
    }else{
        fm= (fnum.length+1)/2
        console.log(fm)
    }
}

let arr1 =[2,3,4]
let arr2= [1,5,6]
median(arr1,arr2)



var arr =[22,"Manish",34,"sohan"]
var modArr=[]

for(let i=0;i<= arr.length;i++)
{
    if(typeof(arr[i])==="string"){
        modArr.push(arr[i])
        
    }
   
}

console.log(modArr)
if(Array.isArray(arr)){
alert(typeof(arr))
}