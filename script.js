function getID(id) {
    return document.getElementById(id);
}

function solve() {
    var problem = getID("math");
    var solution = getID("solution");

    try {
        if (problem.value == "") throw "You didn't enter a problem!";
        solution.textContent = `Solution: ${eval(problem.value)}`;
    } catch (e) {
        console.log(e);
        solution.textContent = e;
    }
}

