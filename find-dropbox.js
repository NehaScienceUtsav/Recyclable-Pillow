// Initialize map and geolocation
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: -34.397, lng: 150.644 }, // Default center
    });

    // Prompt user for location access
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
                // Center map on user's location
                map.setCenter(userLocation);

                // Add a marker for the user's location
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: 'Your Location',
                });

                // Add dummy drop box locations within 5km radius
                const dropboxLocations = [
                    { lat: userLocation.lat + 0.02, lng: userLocation.lng + 0.01 },
                    { lat: userLocation.lat - 0.01, lng: userLocation.lng - 0.02 },
                    { lat: userLocation.lat + 0.015, lng: userLocation.lng - 0.015 },
                ];

                // Add markers for each dropbox location
                dropboxLocations.forEach((location, index) => {
                    const marker = new google.maps.Marker({
                        position: location,
                        map: map,
                        title: `Dropbox Location ${index + 1}`,
                    });

                    // Add click event to redirect to Google Maps for directions
                    marker.addListener('click', () => {
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, '_blank');
                    });
                });
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

// Handle geolocation errors
function handleLocationError(browserHasGeolocation, pos) {
    alert(
        browserHasGeolocation
            ? 'Error: The Geolocation service failed. Please enable location access.'
            : 'Error: Your browser doesn\'t support geolocation.'
    );
}
