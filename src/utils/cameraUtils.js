export async function setupMediaStream(setMediaStream) {
    try {
        const ms = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false
        });
        setMediaStream(ms);
    } catch (e) {
        alert("Camera is disabled");
        // throw e;
    }
}

export async function setupWebcamVideo(mediaStream, setMediaStream,videoRef) {
    if (!mediaStream) {
        await setupMediaStream(setMediaStream);
    } else {
        const videoCurr = videoRef.current;
        if (!videoCurr) return;
        const video = videoCurr;
        if (!video.srcObject) {
            video.srcObject = mediaStream;
        }
    }
    console.log("Working here")
}