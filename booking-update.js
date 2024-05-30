jQuery(document).ready(function($) {
    $('.update-booking-status').on('click', function(event) {
        event.preventDefault();

        var orderId = $(this).closest('tr').find('.jet-dynamic-table__col--orderid a').text();

        $.ajax({
            url: myAjax.ajaxurl,  // Use the localized ajaxurl
            type: 'POST',
            data: {
                action: 'update_booking_status_ajax',
                order_id: orderId,
                security: myAjax.nonce 
            },
            success: function(response) {
                var data = JSON.parse(response); 
                if (data.success) {
                    alert('Booking status updated successfully!');
                    // You can add more UI updates here (e.g., change button text)
                } else {
                    alert('Error: ' + data.data);
                }
            },
            error: function() {
                alert('An error occurred during the AJAX request.');
            }
        });
    });
});
