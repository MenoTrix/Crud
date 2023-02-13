// Get TOtal Amount

let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let create=document.getElementById("submit")
let allPrices=document.querySelectorAll('input[type="number"]')
let theTbody=document.querySelector("#tbody")
let deleteDiv=document.querySelector("#deleteAll")
let mode="create"
let tmp; 
function totalPrice() {
 if(price.value ){
    let result=(+price.value+ +taxes.value+ +ads.value)-+discount.value
    total.textContent=`${result}`
    total.style.background="green"
    
   }
   else{
      total.textContent=` `
      total.style.background="red"
      
   }
}
totalPrice()
let productArray;
if(localStorage.product != null){
   productArray=JSON.parse(localStorage.product)
}else{
   productArray=[]
}



create.onclick=function(){
   if(title.value && price.value && count.value && category.value){
      
   let newProductObj={
      "title":title.value.toLowerCase(),
      "price":price.value,
      "taxes":taxes.value,
      "ads":ads.value,
      "total":total.innerHTML,
      "discount":discount.value,
      "count":count.value,
      "category":category.value.toLowerCase()
   }
   if(count.value <= 100){
   if(mode=="create"){
      console.log("Trix");
      if(newProductObj.count > 1 ){
      for (let i = 0; i < newProductObj.count; i++) {
         productArray.push(newProductObj)      
      }
   }else{
      productArray.push(newProductObj)
   }
}else{
   productArray[tmp]=newProductObj
   create.textContent="Create"
   count.style.display="block"
   // total.style.background="red"
}
}
   localStorage.setItem("product",JSON.stringify(productArray))
   
   clearData()
   showData()
         // **********CHAT GPT solution to show the products on the screen************************
   // for (let i = 0; i < productArray.length; i++) {
   //    const row = document.createElement('tr');
      
   //    // Create a cell for each property in the current product object
   //    const currentProduct = productArray[i];
   //    for (const prop in currentProduct) {
   //      const cell = document.createElement('td');
   //      cell.textContent = currentProduct[prop];
   //      row.appendChild(cell);
   //    }
      
      // Add the row to the table
      // theTbody.appendChild(row);
}
}
function clearData(){
 title.value=" "
 price.value=" "
 taxes.value=" "
discount.value=" "
 total.innerHTML=" "
 count.value=" "
category.value=" "
}
function showData(){
   totalPrice()
   let table=""
   for (let i = 0; i < productArray.length; i++) {
      table +=`
      <tr>
      <td>${i+1}</td>
      <td>${productArray[i].title}</td>
      <td>${productArray[i].price}</td>
      <td>${productArray[i].taxes}</td>
      <td>${productArray[i].ads}</td>
      <td>${productArray[i].discount}</td>
      <td>${productArray[i].total}</td>
      <td>${productArray[i].category}</td>
      <td><button onclick=" updateItem(${i+1}) " id="update" style="color: green;">update</button></td>
      <td><button onclick=" deleteData(${i+1})  " id="delete" style="color: red;">delete</button></td>
      <tr>
      `
      theTbody.innerHTML=table
   }
   if(productArray.length > 0 ){
    deleteDiv.innerHTML=`<button onclick=" deleteAll() "> Delete All Items (${productArray.length})</button>`
 
   }else{
    deleteDiv.innerHTML=" ";
   }
   // Chat GPT delete
   // let deleteButtons = document.querySelectorAll('#delete');
   // for (let i = 0; i < deleteButtons.length; i++) {
   //    deleteButtons[i].addEventListener('click', function(){
   //       let index = this.getAttribute('data-index');
   //       productArray.splice(index, 1);
   //       localStorage.setItem("product", JSON.stringify(productArray));
   //       showData();
   //    });
   

}
showData()
function updateItem(item){
   title.value=productArray[item].title 
   price.value=productArray[item].price 
   taxes.value=productArray[item].taxes 
   ads.value=productArray[item].ads 
   discount.value=productArray[item].discount 
   category.value=productArray[item].category 
   count.style.display="none"
   total.value=productArray[item].value 
   create.textContent="update"
   mode="update"
   console.log(mode);
   totalPrice()
   tmp=item
   scroll({
      top:0,
      behavior:"smooth"
   })


   
}
function deleteData(item){
   productArray.splice(item,1)
   localStorage.product=JSON.stringify(productArray)
   showData()
   if(item < 1 ){
      theTbody.innerHTML = ""; // Remove all rows from the table
      deleteDiv.innerHTML = ""; // 
   }
}

// function deleteAll() {
//    localStorage.clear();
//    productArray = [ ];
//    showData();
// }


function deleteAll() {
   localStorage.clear();
   productArray.splice(0)
   theTbody.innerHTML = ""; // Remove all rows from the table
   deleteDiv.innerHTML = ""; // Remove the "Delete All Items" button
}
let searchMode="title";

function getSearchMode(id) {
   let searchBar=document.querySelector("#search")
   if(id=="searchbytitle"){
      searchMode="title"
      searchBar.setAttribute("placeholder","Search By title")
   }else{
      searchMode="category"
      // searchBar.setAttribute("placeholder","Search By category")
      searchBar.placeholder="Search By category"

   } 
   searchBar.focus()

   
}
function searchData(value){
   let table=""
   if(searchMode=="title"){
      for (let i = 0; i < productArray.length; i++) {
            if(productArray[i].title.includes(value.toLowerCase())){
               table +=`
               <tr>
               <td>${i+1}</td>
               <td>${productArray[i].title}</td>
               <td>${productArray[i].price}</td>
               <td>${productArray[i].taxes}</td>
               <td>${productArray[i].ads}</td>
               <td>${productArray[i].discount}</td>
               <td>${productArray[i].total}</td>
               <td>${productArray[i].category}</td>
               <td><button onclick=" updateItem(${i+1}) " id="update" style="color: green;">update</button></td>
               <td><button onclick=" deleteData(${i+1})  " id="delete" style="color: red;">delete</button></td>
               <tr>
               `

            }

      }

   }else{
      
      for (let i = 0; i < productArray.length; i++) {
         if(productArray[i].category.includes(value.toLowerCase())){
            table +=`
            <tr>
            <td>${i+1}</td>
            <td>${productArray[i].title}</td>
            <td>${productArray[i].price}</td>
            <td>${productArray[i].taxes}</td>
            <td>${productArray[i].ads}</td>
            <td>${productArray[i].discount}</td>
            <td>${productArray[i].total}</td>
            <td>${productArray[i].category}</td>
            <td><button onclick=" updateItem(${i+1}) " id="update" style="color: green;">update</button></td>
            <td><button onclick=" deleteData(${i+1})  " id="delete" style="color: red;">delete</button></td>
            <tr>
            ` 

         }

   }
   }
   theTbody.innerHTML=table
   

}
// get total
// create product
// save into localstorage
// clear inputs
// read
// count
// delete
// update
// search
// clear data