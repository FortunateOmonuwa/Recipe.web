export class htmlElements{
     constructor(){
        this.result = document.getElementById("result");
        this.searchBtn = document.getElementById("search-btn");
        this.userInput = document.getElementById("user-input");
        this.parentContainer = document.querySelector(".container");
        this.errorText = document.getElementById("error");
        

        this.userInput.innerText = "";
        
    }
}