let count =0 ;
let currentTaskKey = null;

function submitTask(event) {

    event.preventDefault(); // Prevent form submission

    localStorage.length > 0 ? count = localStorage.length : count = 0 ;
    // console.log(localStorage.length)
    // Getting the values

    const title = document.getElementById('task-title').value;
    const type = document.querySelector('input[name="task-type"]:checked').value;
    const priority = document.getElementById('task-priority').value;
    const status = document.getElementById('task-status').value;
    const date = document.getElementById('task-date').value;
    const description = document.getElementById('task-description').value;

    // Create a task object

    const task = {
        title,
        type,
        priority,
        status,
        date,
        description
    };

    if (currentTaskKey) {
        // Update existing task
        localStorage.setItem(currentTaskKey, JSON.stringify(task));
        currentTaskKey = null;
    } else 

      localStorage.setItem(`tasks${count}`, JSON.stringify(task));

      location.reload();
    

    // Clear the form

    document.getElementById('form-task').reset();

    // Close the modal

    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
    count++ ;
    console.log(count)
    displayTaskDetails()

    Swal.fire({
        title: "Good job!",
        text: "You have added a task!",
        icon: "success"
      });

}

// localStorage.clear()

function displayTaskDetails() {
    console.log("hello")
    let localData = readData()
    const detailsContainer = document.getElementById('to-do-tasks');
    const inProgressTasks = document.getElementById('in-progress-tasks');
    const doneTasks = document.getElementById('done-tasks');

    // Clear previous details

    detailsContainer.innerHTML = '';

    // Create a new div to display task details

    let innerHTML;
    localData.forEach((element) => {
        const task = element.value;
        console.log(task)
        innerHTML = `
              <button class="text-start p-2 d-flex" onclick="populateUpdateForm('${element.key}')">
                      <div class="">
                          <i class="fas ${task.optionStatus === "1" ? 'fa-question-circle' : task.optionStatus === "2" ? 'fa-spinner fa-spin' : 'fa-check-circle'} text-success fs-1 me-2"></i>
                      </div>
                      <div>
                          <div class="fs-3 mb-1 title-box">${task.title}</div>
                          <div class="date-box">Created on: ${task.date}</div>
                          <div class="mb-2 task-box" >${task.description}</div>
                          <div>
                              <span class="btn btn-primary">${task.type}</span>
                              <span class="btn btn-outline-secondary">${task.status === "1" ? 'Heigh' : task.status === "2" ? 'Medium' : 'Low'}</span>
    
    
    
     <a type="submit" name="delete" class="btn btn-danger task-action-btn" id="task-delete-btn" onclick="deleteTask('${element.key}')" >Delete</a>
            <a type="submit" name="update" class="btn btn-warning task-action-btn" id="task-update-btn" onclick="populateUpdateForm('${element.key}')" >Update</a>
                          </div>
                      </div>
                  </button>
        `;

        // `<button class="text-start p-2 d-flex" onclick="populateUpdateForm('${element.key}')">
        //         <div class="">
        //             <i class="fas ${task.status === 'To Do' ? 'fa-question-circle' : task.status === 'In Progress' ? 'fa-spinner fa-spin' : 'fa-check-circle'} text-success fs-1 me-2"></i>
        //         </div>
        //         <div>
        //             <div class="fs-3 mb-1 title-box">${task.title}</div>
        //             <div class="date-box">Created on: ${task.date}</div>
        //             <div class="mb-2 task-box">${task.description}</div>
        //             <div>
        //                 <span class="btn btn-primary">${task.type}</span>
        //                 <span class="btn btn-outline-secondary">${task.priority}</span>
        //                 <a type="button" class="btn btn-danger task-action-btn" onclick="deleteTask('${element.key}')">Delete</a>
        //                 <a type="button" class="btn btn-warning task-action-btn" onclick="populateUpdateForm('${element.key}')">Update</a>
        //             </div>
        //         </div>
        //     </button>
        // `;
        console.log(task.status)
        if (task.status === "To Do") {
            detailsContainer.innerHTML += innerHTML
        }else if(task.status === "In Progress"){
            inProgressTasks.innerHTML += innerHTML
        }else if(task.status === "Done"){
            doneTasks.innerHTML += innerHTML
        }
    })


    // detailsContainer.push(innerHTML);
}
function readData() {
    // Create an object to hold the items

    const localStorageItems = [];

    // Loop all items in localStorage

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const dataIncrepted = JSON.parse(value)
        localStorageItems.push({
            key: key,
            value: dataIncrepted
        })
    }
    console.log(localStorageItems)

    return localStorageItems;
    location.reload();


}
readData()
// Attach the submitTask function to the form's submit event
document.getElementById('form-task').addEventListener('submit', submitTask);

document.addEventListener("DOMContentLoaded", displayTaskDetails)


function populateUpdateForm(key) {
    
    currentTaskKey = key; // Store the key of the task being updated
    const taskData = JSON.parse(localStorage.getItem(key));

    // Populate the form with the task data
    document.getElementById('task-title').value = taskData.title;
    document.querySelector(`input[name="task-type"][value="${taskData.type}"]`).checked = true;
    document.getElementById('task-priority').value = taskData.priority;
    document.getElementById('task-status').value = taskData.status;
    document.getElementById('task-date').value = taskData.date;
    document.getElementById('task-description').value = taskData.description;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
    
}



function deleteTask(key) {
    localStorage.removeItem(key);
    displayTaskDetails();
    location.reload();
}