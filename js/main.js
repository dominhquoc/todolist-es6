var taskList = new TaskList();
getLocal();

function clearForm(){
    getEle("newTask").value = "";
}

getEle('addTask').addEventListener("click", function () {
    var newTask = getEle("newTask").value;
    var id = Math.random();
    var task = new Task(id, newTask, 'todo');
    var valid = true;
    valid =  kiemTraRong(task.taskName, "#tbtodo", "Todo");
    if (!valid) {
        return;
      }
    taskList.addTask(task);
    rederListTask(taskList.arr);
    setLocal();
    clearForm()
});

const resultOrderByName = () => {
    taskList.arr.sort((prodNext,prod) => {
        let nameProduct = prod.taskName.toLocaleLowerCase();
       let nameProductNext = prodNext.taskName.toLocaleLowerCase();
       if(nameProductNext < nameProduct){
        
        return -1
       }
       return 1;
    })
}
console.log(resultOrderByName);

function rederListTask(arr) {
    var arrTodo = [];
    var arrComplete = [];
    for (var i = 0; i < arr.length; i++){
        if(arr[i].status === 'todo'){
            arrTodo += taoBang(arr[i]);
        }else{
            arrComplete += taoBang(arr[i]);
        }
    }
    getEle('todo').innerHTML = arrTodo;
    getEle('complete').innerHTML = arrComplete;
}
function taoBang(arr) {
    return `
        <li>
            <span>${arr.taskName}</span>
             <div class="buttons">
                <button class="remove" onclick="deleteTask(${arr.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="changeStatus(${arr.id})">
                    <i class="far fa-check-circle"></i>
               </button>
             </div>
         </li>
        `;
}
function deleteTask(id) {
    taskList.deleteTask(id);
    rederListTask(taskList.arr);
    setLocal();
}
function changeStatus(id) {
    var task = taskList.layThongTinTask(id);
    console.log(task);
    if (task.status === 'todo') {
        task.status = 'complete';
    } else {
        task.status = 'todo';
    }
    taskList.capNhatTask(task);
    rederListTask(taskList.arr);
    setLocal();
}
function setLocal() {
    localStorage.setItem("TaskList", JSON.stringify(taskList.arr));
}
function getLocal() {
    if (localStorage.getItem("TaskList")) {
        taskList.arr = JSON.parse(localStorage.getItem("TaskList"));
        rederListTask(taskList.arr);
    }
}
function getEle(id) {
    return document.getElementById(id);
}