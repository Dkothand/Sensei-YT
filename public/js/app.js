const youtubeApiKey = "AIzaSyBLMfcprLCQxeQTD-PAhnmQlI6yCMOnXzk";


const youtubeApiCall = () => {
    // Get search form val
    const userQuery = $('#search').val();

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: youtubeApiKey,
            part: 'snippet',
            q: userQuery
        },
        dataType: 'json',
        type: 'GET'
    }).done((data) => {
        console.log(data.items);
    })
};

// Document ready function
$(() => {
    $('#search-bar').on('submit', (e) => {
        e.preventDefault();
        youtubeApiCall();
    })
});
// End Document ready function