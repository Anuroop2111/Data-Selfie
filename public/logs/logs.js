getData();
async function getData(){
     //Making a GET request from the client side, to route on the server, and that route return all data from the database.
    const response = await fetch('/api'); //We can use same /api, because get and post will be treated as different fn in the server.
    const data = await response.json();

    for (item of data){
        const newdiv = document.createElement("div"); //Creates a new html div element.
        const userdiv = document.createElement("div");
        const geodiv = document.createElement("div");
        const datediv = document.createElement("div");
        const image = document.createElement('img');

        userdiv.textContent = `User: ${item.User}`; //This changes the content inside the userdiv accordingly. User in item.User is the variable created in index.html, which stores the UserId names.  
        geodiv.textContent = `${item.latitude}°,${item.longitude}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        datediv.textContent = dateString
        image.src = item.image64;
        image.alt = "Images taken through web cam."

        newdiv.append(userdiv,geodiv,datediv,image);

        document.body.append(newdiv);
    }
    console.log(data);
}
