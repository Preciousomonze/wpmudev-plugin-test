/* global wp */

import { createRoot, StrictMode, createInterpolateElement } from '@wordpress/element';
import { Button, TextControl } from '@wordpress/components';
import './scss/style.scss';

const domElement = document.getElementById(window.wpmudevPluginTest.dom_element_id);

const WPMUDEV_PluginTest = () => {
    // State variables to store Client ID and Client Secret
    const [clientID, setClientID] = wp.element.useState('');
    const [clientSecret, setClientSecret] = wp.element.useState('');

    // Function to handle save button click
    const handleClick = () => {
        // Making an AJAX request to save credentials
        fetch(window.wpmudevPluginTest.restEndpointSave, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientID,
                client_secret: clientSecret,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // If success, show a happy message, otherwise a sad one
            if (data.success) {
                alert('Credentials saved successfully. You did it!');
            } else {
                alert('Something went wrong. Try again, buddy.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An unexpected error occurred. Computers, am I right?');
        });
    };

    return (
        <>
            <div className="sui-header">
                <h1 className="sui-header-title">Settings</h1>
            </div>

            <div className="sui-box">
                <div className="sui-box-header">
                    <h2 className="sui-box-title">Set Google credentials</h2>
                </div>

                <div className="sui-box-body">
                    <div className="sui-box-settings-row">
                        <TextControl
                            help={createInterpolateElement(
                                'You can get Client ID from <a>here</a>.',
                                {
                                    a: <a href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid" />,
                                }
                            )}
                            label="Client ID"
                            value={clientID}
                            onChange={setClientID}
                        />
                    </div>

                    <div className="sui-box-settings-row">
                        <TextControl
                            help={createInterpolateElement(
                                'You can get Client Secret from <a>here</a>.',
                                {
                                    a: <a href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid" />,
                                }
                            )}
                            label="Client Secret"
                            type="password" // Keeping secrets secret
                            value={clientSecret}
                            onChange={setClientSecret}
                        />
                    </div>

                    <div className="sui-box-settings-row">
                        <span>Please use this URL <em>{window.wpmudevPluginTest.returnUrl}</em> in your Google API's <strong>Authorized redirect URIs</strong> field.</span>
                    </div>
                </div>

                <div className="sui-box-footer">
                    <div className="sui-actions-right">
                        <Button
                            variant="primary"
                            onClick={handleClick}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Check if the createRoot function is available (React 18+), otherwise use render (React 17 and below)
if (createRoot) {
    createRoot(domElement).render(
        <StrictMode>
            <WPMUDEV_PluginTest />
        </StrictMode>
    );
} else {
    wp.element.render(
        <StrictMode>
            <WPMUDEV_PluginTest />
        </StrictMode>,
        domElement
    );
}
