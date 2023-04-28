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
    axios.post("https://crudcrud.com/api/84c5da40c44d489cbd1021d9660976a0/order",obj)
    .then((response)=>{
        displayDetails(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
    

}
async function displayDetails(){
    const table1=document.getElementById("table1");
    const table2=document.getElementById("table2");
    const table3=document.getElementById("table3");

//select ul
    const Table_1=document.getElementById("Table_1");
    const Table_2=document.getElementById("Table_2");
    const Table_3=document.getElementById("Table_3");

    Table_1.innerHTML="";
    Table_2.innerHTML="";
    Table_3.innerHTML="";
    try{
    const response=await axios.get("https://crudcrud.com/api/84c5da40c44d489cbd1021d9660976a0/order")
    const orders=response.data;
    for(let i=0;i<orders.length;i++){
        const order=orders[i];

    const li=document.createElement("li");
    li.id="li";
    const deletebtn=document.createElement("button")
    deletebtn.id="btn1";
    deletebtn.innerText="Delete Order"
    
    deletebtn.addEventListener("click",deleteOrder)
    async function deleteOrder(){
        await axios.delete(`https://crudcrud.com/api/84c5da40c44d489cbd1021d9660976a0/order/${order._id}`)
        if(order.category==table1.value){
            Table_1.removeChild(li);
        }
        else if(order.category==table2.value){
            Table_2.removeChild(li);
        }
        else{
            Table_3.removeChild(li);
        }
    }

    // li.textContent=order.price+"_"+order.dish+"_"+order.category
    // li.appendChild(deletebtn);
    if(order.category==table1.value){
        Table_1.appendChild(li);
    }
    else if(order.category==table2.value){
        Table_2.appendChild(li);
    }
    else{
        Table_3.appendChild(li);
    }
    li.textContent=order.price+"_"+order.dish+"_"+order.category
    li.appendChild(deletebtn);
}
    }catch(error){
        console.log(error);
    }
    
}
document.addEventListener("DOMContentLoaded",()=>{
    displayDetails();
})






