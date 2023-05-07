const form=document.getElementById("form");
form.addEventListener("submit",onSubmit);

async function onSubmit(e){
    e.preventDefault();
    const price=document.getElementById("price").value;
    const dish=document.getElementById("dish").value;
    const category=document.getElementById("category").value;
    const obj={
        price,
        dish,
        category
    }
    try{
    const response= await axios.post("https://crudcrud.com/api/6317cad7f5a247b59aacf601f9cd09a8/order",obj)
    console.log(response.data);
    displayDetails();
    }catch(err){
        console.log(err);
    }
    

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
    const response=await axios.get("https://crudcrud.com/api/6317cad7f5a247b59aacf601f9cd09a8/order");
    const orders=response.data;
    for(let i=0;i<orders.length;i++){
//Storing the data key as order
        const order=orders[i];

    const li=document.createElement("li");
    li.id="li";

//delete button
    const deletebtn=document.createElement("button")
    deletebtn.id="btn1";
    deletebtn.innerText="Delete Order"
    
    // deletebtn.addEventListener("click",deleteOrder)
    deletebtn.onclick=async()=>{
        await axios.delete(`https://crudcrud.com/api/6317cad7f5a247b59aacf601f9cd09a8/order/${order._id}`)
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

//adding the data in particular list after checking category
    if(order.category==table1.value){
        Table_1.appendChild(li);
    }
    else if(order.category==table2.value){
        Table_2.appendChild(li);
    }
    else{
        Table_3.appendChild(li);
    }
    li.textContent=`Price: ${order.price} ---- Dish:${order.dish} ---- Category:${order.category}`
    li.appendChild(deletebtn);
}
    }catch(error){
        console.log(error);
    }
    
}
document.addEventListener("DOMContentLoaded",()=>{
    displayDetails();
})






