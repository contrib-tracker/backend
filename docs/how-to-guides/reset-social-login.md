# Resetting Social Login and Authentication Settings

## Troubleshooting Common Issues

1. **Expired Tokens**:  
   - Renew OAuth credentials via the provider's dashboard.  

2. **Invalid Configuration**:  
   - Check for typos or mismatched URLs in the settings.  
   - Verify `redirect_uri` matches the settings on the provider side.  

## Steps for Resetting

1. **Reconfigure OAuth Settings**:  
   - Update the client ID and secret using environment variables in Platform.sh. Ensure the correct values are set for your project’s environment configuration.

2. **Re-test Integration**:  
   - Follow the testing steps outlined in the [Setting Up Social Login Integration guide](setting-up-social-login.md) to confirm that the changes are working correctly.
