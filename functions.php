<?php 
  
add_action('wp_ajax_update_booking_status_ajax', 'handle_booking_status_update_ajax');
add_action('wp_ajax_nopriv_update_booking_status_ajax', 'handle_booking_status_update_ajax');

function handle_booking_status_update_ajax() {
    error_log("AJAX request received"); // Check if AJAX request is received
error_log("Order ID: " . $order_id); // Check the received order ID

    // Security Check (Nonce Verification)
    check_ajax_referer('update_booking_status_nonce', 'security');

    // Get Order ID
    $order_id = isset($_POST['order_id']) ? sanitize_text_field($_POST['order_id']) : '';

    // Input Validation
    if (!is_numeric($order_id) || $order_id <= 0) {
        echo json_encode(array('success' => false, 'data' => 'Invalid Order ID'));
        wp_die();
    }

    // Database Update
    global $wpdb;
    $table_name = $wpdb->prefix . 'jet_apartment_bookings';

    $result = $wpdb->update(
        $table_name,
        array('status' => 'processing'),
        array('order_id' => $order_id),
        array('%s'),
        array('%d')
    );

    if ($result) {
        echo json_encode(array('success' => true, 'data' => 'Booking status updated successfully!'));
    } else {
        echo json_encode(array('success' => false, 'data' => 'Booking not found or update failed'));
    }

    wp_die(); // Terminate AJAX request
}

function enqueue_booking_update_script() {
    wp_enqueue_script('booking-update', get_stylesheet_directory_uri() . '/booking-update.js', array('jquery'), '1.0', true);

    // Localize ajaxurl and nonce
    wp_localize_script('booking-update', 'myAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),  // Remove the 'relative' parameter
        'nonce' => wp_create_nonce('update_booking_status_nonce'),
    ));
}

add_action('wp_enqueue_scripts', 'enqueue_booking_update_script');


?>
