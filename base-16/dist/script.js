function getBase16(num) {
    return num.toString(16).toUpperCase();
}
var limit = 20;
window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        var data = document.getElementById("data");
        data.parentNode.removeChild(data);
        limit += 25;
        getData();
    }
};
function getData() {
    var data = document.createElement("div");
    data.setAttribute("id", "data");
    document.body.appendChild(data);
    for (var i = 0; i <= limit; i++) {
        var table = document.createElement("table");
        table.setAttribute("id", "table");
        data.appendChild(table);
        var header = document.createElement("tr");
        header.setAttribute("id", "header");
        table.appendChild(header);
        var header1 = document.createElement("th");
        header1.setAttribute("id", "header1");
        header1.innerHTML = "Number";
        header1.style.textAlign = "center";
        header.appendChild(header1);
        var header2 = document.createElement("th");
        header2.setAttribute("id", "header2");
        header2.innerHTML = "Base-16";
        header2.style.textAlign = "center";
        header.appendChild(header2);
        var row = document.createElement("tr");
        row.setAttribute("id", "row");
        table.appendChild(row);
        var num = document.createElement("td");
        num.setAttribute("id", "num");
        num.innerHTML = i;
        row.appendChild(num);
        var base16 = document.createElement("td");
        base16.setAttribute("id", "base16");
        base16.innerHTML = getBase16(i);
        row.appendChild(base16);
        var br = document.createElement("br");
        num.style.textAlign = "center";
        base16.style.textAlign = "center";
        table.style.margin = "auto";
    }
}
getData();
