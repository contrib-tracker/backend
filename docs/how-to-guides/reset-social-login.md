# Resetting Social Login and Authentication Settings

## Troubleshooting Common Issues

1. **Expired Tokens**:  
   - Renew OAuth credentials via the provider's dashboard.  

2. **Invalid Configuration**:  
   - Check for typos or mismatched URLs in the settings.  
   - Verify `redirect_uri` matches the settings on the provider side.  

## Steps for Resetting

1. **Reconfigure OAuth Settings**:  
   - Update client ID and secret in `settings.php`.  

2. **Re-test Integration**:  
   - Use the testing steps from the *Setting Up Social Login Integration* guide to confirm fixes.
