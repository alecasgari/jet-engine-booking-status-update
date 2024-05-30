jQuery(document).ready(function($) {
    $(document).on('click', '.update-booking-status, .decline-booking-status', function(event) {
        event.preventDefault();
        var $row = $(this).closest('tr'); // Get the closest table row

        // Extract order ID from the link in the "Order ID" column
        var orderId = $row.find('.jet-dynamic-table__col--orderid a').text(); 

        var newStatus = $(this).hasClass('update-booking-status') ? 'processing' : 'failed';
        var actionText = newStatus === 'processing' ? 'confirm' : 'decline';

        // Confirmation popup (for both confirm and decline)
        if (confirm('Are you sure you want to ' + actionText + ' this booking?')) {
            updateBookingStatus(orderId, newStatus); 
        }
    });

    // Function to update booking status via AJAX
    function updateBookingStatus(orderId, newStatus) {
        $.ajax({
            url: myAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'update_booking_status_ajax',
                order_id: orderId,
                status: newStatus, 
                security: myAjax.nonce
            },
            success: function(response) {
                var data = JSON.parse(response);
                if (data.success) {
                    alert('Booking status updated successfully!');
                    location.reload(); // Reload page to reflect changes
                } else {
                    alert('Error: ' + data.data);
                }
            },
            error: function() {
                alert('An error occurred during the AJAX request.');
            }
        });
    }
});
