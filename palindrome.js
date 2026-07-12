/*-----For String-------*/

let str= "ayush kuamr mishar"
   let rev=""
   for(let i = str.length -1;i>=0;i--){
       rev += str[i]
   }
if(str===rev){
    console.log("yes")
}
    else{
        console.log("no")
    }