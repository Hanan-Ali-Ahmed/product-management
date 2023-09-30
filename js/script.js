const titleInput = document.getElementById('title')
const priceInput = document.getElementById('price')
const taxesInput = document.getElementById('taxes')
const adsInput = document.getElementById('ads')
const discountInput = document.getElementById('discount')
const totalInput = document.getElementById('total')
const countInput = document.getElementById('count')
const categoryInput = document.getElementById('category')
const submitInput = document.getElementById('submit')

let mood = 'create';
let tmp;   
/////////////////////////////////////////////  function to calculate total 
function getTotall() {
  if (priceInput.value != '') {
    let result = (+priceInput.value + +taxesInput.value + +adsInput.value) - +discountInput.value
    totalInput.innerHTML = result
    totalInput.style.backgroundColor = "#040"
  } else {
    totalInput.innerHTML = ''
    totalInput.style.backgroundColor = "#a00d02"
  }
}
/////////////////////////////////////////////     create   
let data;
if (localStorage.product != null) {              
  data = JSON.parse(localStorage.product)
}
else {
  data = []
}
submitInput.onclick = function () {
  let obj = {
    title: titleInput.value.toLowerCase(),
    price: priceInput.value,
    taxes: taxesInput.value,
    ads: adsInput.value,
    discount: discountInput.value,
    total: totalInput.innerHTML,                                 
    count: countInput.value,
    category: categoryInput.value.toLowerCase()
  }                                        
  // console.log(obj);
  /////////////////////////////            count     
     if(title.value != '' && price.value != '' && category.value != '' && obj.count <= 100 ){
      if (mood === 'create') {
        if (obj.count > 1) {
          for (let i = 0; i < obj.count; i++) {
            data.push(obj)
          }
        } else {
          data.push(obj)
        }
      }
      else {
        data[tmp] = obj;
        countInput.style.display = "block";
        mood = 'create'
        submitInput.innerHTML = "Create"
        countInput.style.display = "block";
      }
      clearData()
     }
  totalInput.style.backgroundColor = "#a00d02";
  console.log(data);   

  // save in  local storage
  localStorage.setItem('product', JSON.stringify(data))
  addData()
}
// ////////////////////////              clear input 
function clearData() {
  titleInput.value = '';
  priceInput.value = '';
  taxesInput.value = '';
  adsInput.value = '';
  discountInput.value = '';
  totalInput.innerHTML = '';                                   
  categoryInput.value = '';
  countInput.value = ''
}
// // ////////     add data into table
function addData() {
  let table = '';
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})"   id="delete">delete</button></td>
 </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = table
  console.log(data);
  let btnDeleteAll = document.getElementById('deleteAll')
  if (data.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick="deleteAll()">delete All (${data.length})</button>
    `
  }
  else {
    btnDeleteAll.innerHTML = '';
  }
}
addData()
////////////////////////////////         Delete
function deleteData(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data)   
  addData()
  // console.log(del);
}
console.log("jked");
////////////////////////////////////           delete All
function deleteAll() {
  localStorage.clear()
  data.splice(0)      
  addData()
}
// ///////////////////////////////////////      Update
function updateData(i) {
  titleInput.value = data[i].title
  priceInput.value = data[i].price
  taxesInput.value = data[i].taxes
  adsInput.value = data[i].ads
  discountInput.value = data[i].discount
  getTotall()
  countInput.style.display = "none";
  categoryInput.value = data[i].category
  submitInput.innerHTML = "Update"
  mood = 'update'
  tmp = i;
  scroll({
    top: 0,       // للاعلى 
    behavior: 'smooth'  // على مهل 
  })
}
/////////////////////    search
let searchMode = 'title'   
function getSearchMode(id) {
  // console.log(id);   
  let search = document.getElementById('search')
  if (id == 'seachTitle') {
    searchMode = 'title'    
  }
  else {
    searchMode = 'category' 
  }
  search.placeholder = 'search by ' + searchMode
     search.focus()     
    // console.log(searchMode);
    search.value = '';    
    addData()
  }
function searchData(value){
// console.log(value);
let table = '';
     for(let i= 0 ;  i < data.length ; i++){
 if(searchMode == 'title'){
      if(data[i].title.includes(value.toLowerCase())){
          //  console.log(i);
          // console.log(data[i].title);
          table += `
          <tr>
          <td>${i}</td>
          <td>${data[i].title}</td>
          <td>${data[i].price}</td>
          <td>${data[i].taxes}</td>
          <td>${data[i].ads}</td>
          <td>${data[i].discount}</td>
          <td>${data[i].total}</td>
          <td>${data[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})"   id="delete">delete</button></td>    
       </tr>
        `    ;
      } }
    else{
        if(data[i].category.includes(value.toLowerCase())){
            //  console.log(i);
            // console.log(data[i].title);
            table += `
           <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})"   id="delete">delete</button></td> 
         </tr>
            ` ;
        }    }}
   document.getElementById('tbody').innerHTML = table;
}