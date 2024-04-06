export async function setupMediaStream(setMediaStream,deviceId) {
    
}

export async function setupWebcamVideo(mediaStream, setMediaStream,videoRef,deviceId) {
    if (!deviceId){
        throw "NO DEVICE"
    }
    try {
        const ms = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: deviceId },
            audio: false
        });
        setMediaStream(ms);
        const videoCurr = videoRef.current;
        if (!videoCurr) return;
        const video = videoCurr;
        video.srcObject = ms;
    } catch (e) {
        alert("Camera is disabled");
    }

}