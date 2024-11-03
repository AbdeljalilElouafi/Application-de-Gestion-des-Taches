let count =0 ;
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


    // Get existing tasks from local storage
    // let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the tasks array
    // tasks.push(task);

    // Save the updated tasks array back to local storage
    localStorage.setItem(`tasks${count}`, JSON.stringify(task));

    // // Create a task card
    // const taskCard = document.createElement('div');
    // taskCard.className = 'task-card';
    // taskCard.innerHTML = `
    //   <div class="task-title">${title}</div>
    //   <div class="task-date">${date}</div>
    //   <div class="task-type">${type}</div>
    //   <div class="task-priority">${priority}</div>
    //   <div class="task-description">${description}</div>
    // `;

    // Append the task card to the To Do column
    // document.querySelector('.panel.panel-inverse .task-details-container').appendChild(taskCard); // Adjusted selector

    // Clear the form
    document.getElementById('form-task').reset();

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
    count++ ;
    console.log(count)
    displayTaskDetails()
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

    // Create a new div for displaying task details
    let innerHTML;
    localData.forEach((element) => {
        const task = element.value;
        console.log(task)
        innerHTML = `
              <button class="text-start p-2 d-flex">
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
    
    
    
     <a type="submit" name="delete" class="btn btn-danger task-action-btn" id="task-delete-btn" >Delete</a>
            <a type="submit" name="update" class="btn btn-warning task-action-btn" id="task-update-btn"  >Update</a>
                          </div>
                      </div>
                  </button>
        `;
        console.log(task.status)
        if (task.status === "To Do") {
            detailsContainer.innerHTML += innerHTML
        }else if(task.status === "In Progress"){
            inProgressTasks.innerHTML += innerHTML
        }else if(task.status === "Done"){
            doneTasks.innerHTML += innerHTML
        }
    })


    // Append the task details to the container
    // detailsContainer.push(innerHTML);
}
function readData() {
    // Create an object to hold the items
    const localStorageItems = [];

    // Loop through all items in localStorage
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
    

}
readData()
// Attach the submitTask function to the form's submit event
document.getElementById('form-task').addEventListener('submit', submitTask);
