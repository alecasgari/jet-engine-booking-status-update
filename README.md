# Jet Bookings Status Update with AJAX

This WordPress project demonstrates how to update the booking status of a Jet Engine booking object using AJAX, without the need to directly modify the Jet Bookings database table.

## Problem:

In some scenarios, you might want to update the status of a booking (e.g., from "pending" to "processing") directly from the front-end of your website when the user clicks a button. This can be challenging when you don't want to expose your database table names and columns or write complex JavaScript code to interact with the database.

## Solution:

This solution leverages Jet Engine's built-in object ID system and WordPress AJAX functionality to provide a secure and efficient way to update booking statuses. Here's the high-level approach:

1. **Form:** A Jet Form Builder form is used to capture the order ID (which corresponds to the Jet Engine booking object ID) that needs to be updated.
2. **JavaScript (booking-update.js):** This script intercepts the form submission and sends the order ID to a custom WordPress AJAX endpoint using an AJAX request.
3. **PHP Handler (functions.php):**  A PHP function is registered to handle the AJAX request. It sanitizes the order ID, updates the booking status in the database using the Jet Engine API, and sends back a response to the JavaScript.

## Implementation:

1. **Child Theme:** Create a child theme if you don't already have one. This will help keep your customizations separate from the parent theme.
2. **Enqueue Scripts:** Add the `enqueue_booking_update_script` function to your child theme's `functions.php` file to properly load the `booking-update.js` file and localize the AJAX URL and nonce.
3. **JavaScript:** Copy the `booking-update.js` code into the file created in step 1.
4. **Form:** Add the Jet Form Builder shortcode to your page, ensuring the `submit_type` is set to `ajax`. 
5. **Security:** Ensure that nonce verification is enabled in both your PHP and JavaScript code to protect against cross-site request forgery (CSRF) attacks.

## Additional Notes:

* This solution assumes you are using Jet Engine to manage your booking objects.
* The Jet Form Builder form should have a number input field named `order_id` where the user can enter the order ID.
* Customize the JavaScript UI update (e.g., change button text, display a message) based on the AJAX response.

## Disclaimer:

Use this code at your own risk. Always test thoroughly in a staging environment before implementing on a live website.

## Contributing:

Feel free to fork this repository, submit issues, or create pull requests with improvements.
