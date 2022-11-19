const API = new OVRT({ function_queue: true }); // Global API calls
var Overlay = new OVRTOverlay(""); // API calls relating to this specific overlay, will be populated properly on API init.
var OverlayCreated = false;

function CreateChatboxOverlay() {
    if(OverlayCreated && Overlay != null) {
        API.sendNotification("Error", "Overlay has already been created!");
        return;
    }
    API.sendNotification("Yay!", "Creating VRC Chatbox + Overlay");
    API.getWristwatchTransform().then(overlay_pos => {
        API.spawnOverlay(overlay_pos).then(overlay => {
            overlay.setBrowserOptionsEnabled(false);
            
            console.log("Spawning VRC Chatbox + Overlay");
            overlay.setOpacity(1);
            overlay.setFramerate(5);
            overlay.setPosition(overlay_pos.posX, overlay_pos.posY, overlay_pos.posZ);
            overlay.bringToMe();
            overlay.setPinned(true);
            overlay.setPersistent(true);
            //overlay.translateUp(-0.2);
            overlay.setContent(0, {
              url: "chatbox.html",
              width: 200,
              height: 30,
            });

            Overlay = overlay;
            OverlayCreated = true;
        }).catch(err => {
            console.error(err);
        });
    })
    
}

function CloseChatboxOverlay() {
    if(OverlayCreated) {
        Overlay.close();
        OverlayCreated = false;
    }
}