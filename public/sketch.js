function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320,240)


    let latitude,longitude;

    const button = document.getElementById('geoloc')
button.addEventListener('click',async event=>{
    const User = document.getElementById('UserId').value;

    video.loadPixels(); //This takes the video element, loads its pixels to a canvas; which will be the converted to Base64 encoding.
    const image64 = video.canvas.toDataURL(); //This is taking the videos canvas, converting it to Base64 encoding and storing it in variable img.


    const data ={latitude,longitude,User,image64};

    const options = {
    method: 'POST', //We need to post the data to the api link.
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) //We need the data to be sent as json.
    
    
}
    //fetch fn used to send data as a POST.
const response = await fetch('/api',options); //The response send from the server side is showed to the client side (fetch returns a promise after sending the data as POST).
   const json = await response.json() //Getting the response in json format.
    console.log(json);
});




    //Checking if Geolocation is supported.
    if('geolocation' in navigator) {
    console.log('Geolocation available!')
    //To get the current position.
navigator.geolocation.getCurrentPosition(async position => {
//console.log(position);
latitude = position.coords.latitude;
longitude = position.coords.longitude;
console.log(latitude,longitude)
document.getElementById('lat').textContent = latitude;
document.getElementById('lon').textContent = longitude;
}); 
} else {
    console.log('Geolocation unavailable!')
}

}
