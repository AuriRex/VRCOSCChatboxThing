const API = new OVRT({ function_queue: true }); // Global API calls
var Overlay = new OVRTOverlay(""); // API calls relating to this specific overlay, will be populated properly on API init.

API.setCurrentBrowserTitle("VRC Chatbox +"); // Shows in the 'Window List' menu.
API.getUniqueID().then( // Gets the UID of this overlay.
    (foundId) => {
        if (foundId != -1) {
            Overlay = new OVRTOverlay(foundId);
        }
        else {
            console.log("Looks like an overlay doesn't exist at this ID!");
        }
    }
);

function OnKeyUp(event) {
    if (event.key == "Enter") {
        let value = document.getElementById("message").value;
        document.getElementById("message").value = "";
        
        if(value == "")
            return;

        API.sendOSCMessage("/chatbox/typing", false, 2);
        API.sendOSCMessageArray("/chatbox/input", [ value, true ]);
    } else {
        API.sendOSCMessage("/chatbox/typing", true, 2);
    }
}