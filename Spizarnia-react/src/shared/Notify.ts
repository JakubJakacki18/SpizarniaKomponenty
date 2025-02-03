export function Notify(text = "test") {
    console.log("Weszło do notify")
    if (!("Notification" in window)) {
        alert("Przeglądarka nie jest wspierana")
    } else if (Notification.permission === "granted") {
        const notification = new Notification(text)
    }
    else if (Notification.permission === "default") {
        Notification.requestPermission().then((permission)=>{
            if(permission === "granted")
                {
                    const notification = new Notification(text)
                }
        })
    }
}