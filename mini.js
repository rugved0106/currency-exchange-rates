let url = "https://api.currencylayer.com/"; //api base url
let ak = "6bfe79d545d62eba96eabee19675fa17";  //api access key (for 24 hours)

let dropdown = document.querySelectorAll(".drop_down select");   //assess all dropdowns on the page
let btn = document.querySelector("button");  // acess the button on the page
let fromc = document.querySelector(".from select"); //accessed all the curency wihch we want to convert from
let toc = document.querySelector(".To select"); // aceesd all the currency which we want to convert to

let msg_box = document.querySelector(".result");   // access the message box on the page

for(let select of dropdown) {    //selecting each value in dropdown
    for( curcode in countryList){    //selecting picking each countary code from existing countary list
        let noption = document.createElement("option"); //creating a new option
        noption.value = curcode; // assigning the value of the option
        noption.innerText = curcode; //appending the value of the option
        if(select.name === "from" && curcode === "USD"){   
            noption.selected = true;   //conditions added
        }
        else if(select.name === "to" && curcode === "INR"){
            noption.selected = true;   
        }
        select.append (noption);    
    }
    select.addEventListener("change", (event) => {    //added eventlistner on clicking
        updateflag(event.target) //target is used to point the variable
    })
}

const updateflag = (element) =>{     //making a function to change the countray flag according to selecting options
    let curcode = element.value; //getting the value of the selected option
    console.log(curcode);
    let flagcode = countryList[curcode];  // getting the flag code of the selected option
    console.log(flagcode);
    let newimg = `https://flagsapi.com/${flagcode}/flat/64.png` ; //creating the new url for the flag from the base url
    let img = element.parentElement.querySelector("img");  // accessing the image tag from the parent element
    img.src = newimg;  //changing the src of the image tag to the new url
}

btn.addEventListener("click", async (event) => {   //created an event listener on the button click
    event.preventDefault();//removes defalut variable
    let amt = document.querySelector("input"); // accessing the input field
    let amtval = amt.value; // getting the value of the input field
    console.log(amtval);

    console.log(fromc.value, toc.value);

    let new_url = `${url}convert?from=${fromc.value}&to=${toc.value}&amount=${amtval}&access_key=${ak}`;   //created the new url to convert the currencies by the amount inputed from base url and accesskey
    console.log(new_url);
    let response = await fetch(new_url);  // fetching the data from the new url
    let data = await response.json(); // getting data from fetched url in json format
    console.log(response);
    console.log(data);

    // let rate = data.conversion_rate;
    let result = data.result; // getting the result from the data
    console.log(result);

    msg_box.innerText = `${amtval} ${fromc.value} = ${result} ${toc.value}`; //printing the result in the msg box which is defined
    
});
