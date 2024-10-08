var taskCounter = 0;
var progressDisplay = document.getElementById("res");

$(document).ready(function() {
    $("#check").on("click", function() {
        var task = $("#taskInput").val();
        var date = $("#taskdate").val();
       
        if (task) {
            var taskItem = $('<li class="task-item">' +
                '<div class="lis">' + task + '</div>' +
                '<div class="lis2">' + date + '</div>' +
                '<div class="buttons">' +
                '<h4 class="edit"><i class="fa-solid fa-pen-to-square"></i></h4>' +
                '<h4 class="delete" ><i class="fa-solid fa-trash"></i></h4>' +
                '</div></li>');
            $("#list").append(taskItem);
           
            $("#taskInput").val("");
            $("#taskdate").val("");

            
            if (new Date(date) < new Date()) {
                var oldTaskItem = taskItem.clone();
                $(".tree").append(oldTaskItem);
                oldTaskItem.find(".delete").on("click", function() {
                    removeTask(oldTaskItem, task, date);
                });
            }
           
            taskItem.find(".edit").on("click", function() {
                var newTask = prompt("Edit your task:", task);
                if (newTask) {
                    taskItem.find('.lis').text(newTask);
                }
            });

            taskItem.find(".delete").on("click", function() {
                removeTask(taskItem, task, date);
            });
        }
    });

    $("#erase").on("click", function() {
        $("#taskInput").val("");
        $("#taskdate").val("");
    });

    $("#squ").on("click", function() {
        $("#ipo").fadeToggle(500);
        $(".search").fadeToggle(500);
    });

    $("#glass").on("click", function() {
        $("#ipo").fadeToggle(500);
    });

    $("#ipo").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#list .task-item").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });


$("#list").on("click", ".task-item", function() {
    var taskName = $(this).find('.lis').text();
    var taskDate = $(this).find('.lis2').text();
    var completedTask = $('<li class="second">' + taskName + ' - ' + taskDate + '</li>').appendTo(".complete");

    
    $(this).find(".edit").html('<h3 style="align-item:center;"><i class="fas fa-check-circle"></i></h3>');
    
    taskCounter++;
    updateProgress();
});

function removeTask(taskItem, task, date) {
   
    $(".complete").find("li:contains('" + task + " - " + date + "')").remove();
    $(".tree").find(".task-item").filter(function() {
        return $(this).find('.lis').text() === task && $(this).find('.lis2').text() === date;
    }).remove();
    taskItem.remove();
    taskCounter--;
    updateProgress();
}


function updateProgress() {
    var progressPercentage = (taskCounter / 5) * 100;
    progressDisplay.textContent = progressPercentage + "%";
}
});