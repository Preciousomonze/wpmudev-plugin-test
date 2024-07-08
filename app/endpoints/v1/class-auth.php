<?php
/**
 * Google Auth Shortcode.
 *
 * @link          https://wpmudev.com/
 * @since         1.0.0
 *
 * @package       WPMUDEV\PluginTest
 */

namespace WPMUDEV\PluginTest\Endpoints\V1;

defined( 'WPINC' ) || die;

use WPMUDEV\PluginTest\Endpoint;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;

class Auth extends Endpoint {
	/**
	 * API endpoint for the current endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @var string $endpoint
	 */
	protected $endpoint = 'auth/auth-url';

	/**
	 * Register the routes for handling auth functionality.
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			$this->get_namespace(),
			$this->get_endpoint(),
			array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'save_credentials' ),
					'permission_callback' => array( $this, 'permissions_check' ),
					'args'                => array(
						'client_id'     => array(
							'required'    => true,
							'description' => __( 'The client ID from Google API project.', 'wpmudev-plugin-test' ),
							'type'        => 'string',
						),
						'client_secret' => array(
							'required'    => true,
							'description' => __( 'The client secret from Google API project.', 'wpmudev-plugin-test' ),
							'type'        => 'string',
						),
					),
				),
			)
		);
	}

	/**
	 * Check if the current user has the required capabilities.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return bool
	 */
	public function permissions_check( WP_REST_Request $request ) {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Save the client ID and secret.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function save_credentials( WP_REST_Request $request ) {
		$client_id     = sanitize_text_field( $request->get_param( 'client_id' ) );
		$client_secret = sanitize_text_field( $request->get_param( 'client_secret' ) );

		$options = array(
			'client_id'     => $client_id,
			'client_secret' => $client_secret,
		);

		update_option( 'wpmudev_plugin_test_settings', $options );

		return new WP_REST_Response( array( 'status' => 'success' ), 200 );
	}
}
