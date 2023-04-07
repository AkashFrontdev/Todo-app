const createBtn = document.querySelector(".create-btn");
const ul = document.querySelector("#ul-list");
const elInput = document.querySelector(".el-input");
const postForm = document.querySelector(".post-form");

const count = document.querySelector('.count');


let data = JSON.parse(localStorage.getItem('arr'));
let allTodo = data ? data : [];
elInput.style.width = '570px';
const arr = [];
let index = -1;

// arr = data ? arr : [];
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (elInput.value === "") {
    alert("Please, Fill in the blanks");
  } else {
    let obj = {
      name: elInput.value,
      id: arr.length,
    };

    console.log(obj);

    if(index == -1) {
      arr.push(obj);
    } else {
      arr[index].name = elInput.value;
      index = -1;
    }
    
    elInput.value = "";
    render(arr);

   
  }
});

function render(array) {

  ul.innerHTML = null;
  count.textContent = arr.length;

  array.forEach((element) => {
    let elLi = document.createElement("li");
    elLi.classList.add("list-group-item", "d-flex", "align-items-center");
    ul.appendChild(elLi);

    let input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("form-check-input", "isChecked");
    elLi.appendChild(input);

    let span = document.createElement("span");
    span.classList.add("text", "ms-1");
    span.textContent = element.name;
    elLi.appendChild(span);

    let elDiv = document.createElement("div");
    elDiv.classList.add("d-flex", "ms-auto", "ms-2");
    elLi.appendChild(elDiv);

    let editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-success");
    editBtn.dataset.indexItem = element.id;
    editBtn.innerHTML = "Edit";
    elDiv.appendChild(editBtn);


    localStorage.setItem('arr', JSON.stringify(arr));

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger", "ms-2");
    deleteBtn.innerHTML = "Delete";
    elDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", (evt) => { 
      evt.preventDefault();
      elLi.remove();


      arr = allTodo;
      render(arr);
      localStorage.setItem('allTodo', JSON.stringify(arr));
    });

    editBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      // if(editBtn.textContent == 'Edit'){
        // editBtn.textContent = "Save";
        elInput.value = span.textContent;
        index = e.target.dataset.indexItem;
        render(arr);
      localStorage.setItem('arr', JSON.stringify(allTodo));
      
    })
  });
}
render(arr);

render(allTodo);


