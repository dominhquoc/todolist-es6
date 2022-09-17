function TaskList() {
    this.arr = [];
    this.addTask = function (task) {
        this.arr.push(task);
    };
    this.deleteTask = function (id) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === id) {
                this.arr.splice(i, 1);
                break;
            }
        }
    };
    this.timViTri = function (id) {
        var viTri = -1;
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === id) {
                viTri = i;
                break;
            }
        }
        return viTri;
    };
    this.layThongTinTask = function (id) {
        var viTri = this.timViTri(id);
        if (viTri !== -1) {
            //tìm thấy task
            return this.arr[viTri];
        };
    };
    this.capNhatTask = function(task){
        var viTri = this.timViTri(task.id);
        if(viTri !== -1){
            this.arr[viTri] = task;
        }
    }
    
}