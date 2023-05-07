const form=document.getElementById("form");
form.addEventListener("submit",onSubmit);

function onSubmit(e){
    e.preventDefault();
    const price=document.getElementById("price").value;
    const dish=document.getElementById("dish").value;
    const category=document.getElementById("category").value;
    const obj={
        price,
        dish,
        category
    }
    let x=JSON.stringify(obj);
    localStorage.setItem(obj.category,x);
    
    displayDetails(obj);
    

}
function displayDetails(obj){
    const table1=document.getElementById("table1");
    const table2=document.getElementById("table2");
    const table3=document.getElementById("table3");

//select ul
    const Table_1=document.getElementById("Table_1");
    const Table_2=document.getElementById("Table_2");
    const Table_3=document.getElementById("Table_3");

    const li=document.createElement("li");
    li.id="li";
    const deletebtn=document.createElement("button")
    deletebtn.id="btn1";
    deletebtn.innerText="Delete Order"
    
    if(category.value==table1.value){
        Table_1.appendChild(li);
    }
    else if(category.value==table2.value){
        Table_2.appendChild(li);
    }
    else{
        Table_3.appendChild(li);
    }

    deletebtn.addEventListener("click",deletOrder)
    function deletOrder(){
        localStorage.removeItem(obj.category)
        if(obj.category==table1.value){
            Table_1.removeChild(li);
        }
        else if(obj.category==table2.value){
            Table_2.removeChild(li);
        }
        else{
            Table_3.removeChild(li);
        }
    }
    li.textContent=`Price:  ${obj.price}---- Dish:  ${obj.dish}---- Category:  ${obj.category}`
    li.appendChild(deletebtn);
}






