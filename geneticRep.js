/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/

let teacherTester = 'Sissel';
let repDataTester = [
    [1, 'Programming 1', '123', null],
    [2, 'Programming 1', '123', null],
    [4, 'Programming 2', '123', null],
    [7, 'AP Com Sci', '121', null]
    [8, 'Consumer Ec', '128', 'Lynne']
];
// FIXME: update with the created classes
// Currently [Period, Class, Room, Co-Teacher]

<div class="container my-3">
    <table class="table table-borderless">
        <thead>
            <tr>
                <th>Teacher</th>
                <th>Period 1</th>
                <th>Period 2</th>
                <th>Homeroom</th>
                <th>WIN</th>
                <th>Period 3</th>
                <th>Period 4</th>
                <th>Period 5</th>
                <th>Period 6</th>
                <th>Period 7</th>
                <th>Period 8</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="teacherName"></td>
                <td id="p1"></td>
                <td id="p2"></td>
                <td id="Homeroom"></td>
                <td id="WIN"></td>
                <td id="p3"></td>
                <td id="p4"></td>
                <td id="p5"></td>
                <td id="p6"></td>
                <td id="p7"></td>
                <td id="p8"></td>
            </tr>
        </tbody>
    </table>
</div>

document.getElementById("teacherName").innerHTML = teacherTester;

for(var i = 0 ; i < repDataTester.length ; i++){
    var repDataRows = repDataTester[i];
    
    System.out.println(repDataRows[0]);
//https://stackoverflow.com/questions/6458128/accessing-javascript-variable-stored-in-an-array
//might help
}
/*
document.getElementById("p1").innerHTML =
document.getElementById("p2").innerHTML =
document.getElementById("p4").innerHTML =
document.getElementById("p7").innerHTML =
document.getElementById("p8").innerHTML =
*/