let arr =["qtu","pihu",2,5,6,"A","C",'k']
let nI =[]
let str =[]
let cha=[]
for (let i=0;i<arr.length;i++){
    if(typeof(arr[i])==="number"){
        nI.push(arr[i])
    }else if(typeof(arr[i])==="string"){
        if(arr[i].length ===1){
            cha.push(arr[i])
        }else{
            str.push(arr[i])
        }
    }
}
console.log(nI)
console.log(str)
console.log(cha)
   