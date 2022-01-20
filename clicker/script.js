var bucks = 0;
var hold = false;
var mult = 1;
var cps = 0;

function getID(id) {
		return document.getElementById(id);
}

var longscript = "";


$(function () {

    var upgradesIndex = 0;

	function makeUpgrade(text, cost, prize, message) {
		upgradesIndex += 1;
        getID("upgrades").innerHTML += (`<br><button style="display:none" id=u-${upgradesIndex}>${text} ($${cost})<br>${message == undefined ? "" : message}</button>`);
		longscript += (`
        function LOOP_${upgradesIndex}() {
            if (bucks >= ${cost}) {
                //$("#u-${upgradesIndex}").prop("disabled", false);
                $("#u-${upgradesIndex}").show();
            } else {
                //$("#u-${upgradesIndex}").prop("disabled", true);
                $("#u-${upgradesIndex}").hide();
            }
        }
        
        $("#u-${upgradesIndex}").click(function() {
            bucks -= ${cost};
            ${prize};
        });`);
    }
    
    function addUpgradeLoops() {
        longscript += (`

        function loop() {
            `)
        for (let i = 1; i <= upgradesIndex; i++) {
            longscript += (`LOOP_${i}();
            `)
        }
        longscript += (`setTimeout(loop);
        }
        loop();`);
    }

    makeUpgrade("Tiny Robot", 100, "cps += 1", "Adds 1 CPS");

    makeUpgrade("Extra Finger", 250, "mult += 1", "Adds 1 Multiplier");

    makeUpgrade("Large Robot", 1000, "cps += 10", "Adds 10 CPS");

    makeUpgrade("10 Fingers", 2500, "mult += 10", "Adds 10 Multipliers");

    addUpgradeLoops();

    eval(longscript);

	$("#getbx").click(function() {
		bucks += mult;
	});

	$("#getbx").mousedown(function() {
		hold = true;
	})

	$("#getbx").mouseup(function() {
		hold = false;
	})

	function update() {
		$("#bx").html(bucks);
		$("#cps").text(cps);
		$("#mult").text(mult);

		setTimeout(update);
	}

	function autoClick() {
		if (cps > 0) {
			bucks++;
			setTimeout(autoClick, 1000 / cps / mult);
		} else {
			setTimeout(autoClick, 1000);
		}
    }
    
    function holdLoop() {
        if (hold) {
            bucks++;
        }
        setTimeout(holdLoop, 250/mult);
    }

    holdLoop();

	update();
	autoClick();

})