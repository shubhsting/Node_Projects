const $ = require("jquery");
// when the whole page is loaded
$(document).ready(function () {
    let db = [];
    $(".row .cell").on("click", function () {
        let ci = $(this).attr("ci");
        let ri = $(this).attr("ri");
        let row = Number(ri) + 1;
        console.log();
        let col = String.fromCharCode(Number(ci) + 65);
        $("#address").val(col + "" + row);
        if (db[ri][ci].formula != "")
            $("#formula").val(db[ri][ci].formula);
        else
            $("#formula").val(db[ri][ci].value);
    });

    $(".formula").on("blur", function () {
        let cCell = $("#address").val();
        let formula = $("#formula").val();
        let { rowId, colId } = getRCFromAdd(cCell);
        let cellObj = db[rowId][colId];
        if (cellObj.formula == formula) {
            return;
        }
        cellObj.formula = formula;
        setUpFormula(cellObj, cCell);
        let value = evaluate(cellObj, cCell);
        setValue(rowId, colId, value, cellObj);

    })

    $(".grid .cell").on("blur", function () {
        let ci = $(this).attr("ci")
        let ri = $(this).attr("ri");
        let cellObj = db[ri][ci];
        if ($(this).text() == cellObj.value) {
            return;
        }
        cellObj.value = $(this).text()
        if (cellObj.formula) {
            removeFormula(cellObj);
        }

        setValue(ri, ci, cellObj.value, cellObj);
    });

    function setUpFormula(cellObj, cCell) {
        let formula = cellObj.formula;
        let fCompArr = formula.split(" ");
        for (let i = 0; i < fCompArr.length; i++) {
            let token = fCompArr[i];
            let firstChar = fCompArr[i].charCodeAt(0);
            if (firstChar >= 65 && firstChar <= 90) {
                //cell
                let pRC = getRCFromAdd(token);
                // console.log(rowId + " " + colId)
                let pObj = db[pRC.rowId][pRC.colId];
                //    add yourself to parent array 
                pObj.children.push(cCell);
                cellObj.parent.push(token);
            }
            console.log(formula);
        }
    }


    function removeFormula(cellObj) {
        let parents = cellObj.parent;

        for (let i = 0; i < parents.length; i++) {
            let pObjRC = getRCFromAdd(parents[i]);
            let children = db[pObjRC.rowId][pObjRC.colId].children;
            let childName = $("#address").val();

            // for (let j = 0; j < children.length; j++) {
            //     if (children[i] == childName) {
            //         children.splice(i, 1);
            //         break;
            //     }
            // }
            children = children.filter(function (ch) {
                return ch != childName;
            })
            db[pObjRC.rowId][pObjRC.colId].children = children;


        }
        cellObj.parent = [];
        cellObj.formula = "";
    }

    function setValue(rowId, colId, value, cellObj) {
        $(`.grid .cell[ci=${colId}][ri=${rowId}]`).text(value);
        cellObj.value = value;
        let children = cellObj.children;
        for (let i = 0; i < children.length; i++) {
            let chObjRC = getRCFromAdd(children[i]);
            let chObj = db[chObjRC.rowId][chObjRC.colId];
            let value = evaluate(chObj);
            // get children address
            setValue(chObjRC.rowId, chObjRC.colId, value, chObj);
            // evaluate 
            // setValue call
        }
    }

    function evaluate(cellObj) {
        let formula = cellObj.formula;
        // split the code
        // ( A1 + A2 )
        let fCompArr = formula.split(" ");
        // [(, A1, +, A2, )]
        // console.log(fCompArr);
        for (let i = 0; i < fCompArr.length; i++) {
            let token = fCompArr[i];
            let firstChar = fCompArr[i].charCodeAt(0);
            if (firstChar >= 65 && firstChar <= 90) {
                //cell
                let { rowId, colId } = getRCFromAdd(token);
                // console.log(rowId + " " + colId)
                let pObj = db[rowId][colId];
                let value = pObj.value;
                formula = formula.replace(token, value);
                //    add yourself to parent array 
                // pObj.children.push(cCell)
            }
            console.log(formula);
        }
        //  this function eveluate any valid js code
        // stack infix evaluation
        // (10+20+30)
        let value = eval(formula);
        return value;
    }
    init();

    function init() {
        let allRows = $(".grid .row")
        for (let i = 0; i < allRows.length; i++) {
            let colOfRows = $(allRows[i]).find(".cell");
            let rowArr = [];
            for (let j = 0; j < colOfRows.length; j++) {
                let cellObj = {
                    value: 0,
                    formula: "",
                    children: [],
                    parent: []
                }
                rowArr.push(cellObj);
            }
            db.push(rowArr);
        }
        // console.log(db)
    }

})

function getRCFromAdd(addr) {
    let colAscii = addr.charCodeAt(0);
    let colId = Number(colAscii) - 65;
    let rowId = Number(addr.substring(1)) - 1;
    return { colId, rowId }
}