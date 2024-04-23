$(document).ready(function () {
    console.log('base url: ', baseUrl);
    var images = [baseUrl + "assets/QR/install_app.png", baseUrl  + "assets/QR/website_webxr_url.png"];
    var texts = ["Please scan this QR code with your smart phone to get WebXR Viewer app (currently only iOS)", "Now scan this QR code to go to this webpage on your phone, with the WebXR Viewer browser."];
    var currentIndex = 0;
    var totalImages = images.length;

    $('.next').click(function () {
        // Move current content out of view
        $('.modal-image').addClass('hidden-left');
        $('.modal-text').addClass('hidden-left');

        setTimeout(function () {
            // Update to next content set
            currentIndex = (currentIndex + 1) % totalImages;
            $('.modal-image').attr('src', images[currentIndex]);
            $('.modal-text').text(texts[currentIndex]);

            // Move new content into view from the right
            $('.modal-image').removeClass('hidden-left').addClass('hidden-right');
            $('.modal-text').removeClass('hidden-left').addClass('hidden-right');

            requestAnimationFrame(function () {
                $('.modal-image').removeClass('hidden-right');
                $('.modal-text').removeClass('hidden-right');
            });

            // Check if we need to change the button to 'Finish'
            if (currentIndex === totalImages - 1) {
                $('.next').text('Finish').removeClass('next').addClass('finish');
            }
        }, 500); // Match the CSS transition time
    });

    // New handler for the finish button
    $(document).on('click', '.finish', function () {
        $('#exampleModal').modal('hide');
    });
});

