function gmap_ready() {
    console.log(`gmap is now ready. event emitted`)
    const gmap_ready_event = new Event('gmap_ready')
    window.dispatchEvent(gmap_ready_event)
}
