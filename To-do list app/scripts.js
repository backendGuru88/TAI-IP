const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// function addTask(){
//     if (inputBox.value === ''){
//         alert("You Must write something!");
//     }
//     else{
//         let li = document.createElement("li");
//         li.innerHTML = inputBox.value;
//         listContainer.append(li);
//         let span = document.createElement("span")
//         span.innerHTML = "\u00d7"  
//         // icon code for close tag
//         li.append(span)
//     }
//     inputBox.value = '';
//     saveData();

// }

function addTask() {
    const taskName = inputBox.value;
    const timeInput = prompt("Enter time (hh:mm:ss):");
    if (taskName && timeInput) {
        let li = document.createElement("li");
        li.innerHTML = `${taskName} (${timeInput})`;
        li.dataset.time = timeInput; // Store the time as a dataset attribute
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

let countdownInterval;

function startCountdown() {
    const tasks = document.querySelectorAll("li");
    if (tasks.length === 0) {
        alert("Add tasks before starting the timer.");
        return;
    }

    const countdownDisplay = document.getElementById("countdown");
    const timeParts = tasks[0].dataset.time.split(":").map(Number);
    let totalTimeInSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];

    countdownInterval = setInterval(function () {
        if (totalTimeInSeconds <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "00:00:00";
            tasks[0].remove();
            if (tasks.length > 0) {
                startCountdown();
            }
        } else {
            const hours = Math.floor(totalTimeInSeconds / 3600);
            const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
            const seconds = totalTimeInSeconds % 60;
            countdownDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            totalTimeInSeconds--;
        }
    }, 1000);
}




listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    } 
        
    
}, false);


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();