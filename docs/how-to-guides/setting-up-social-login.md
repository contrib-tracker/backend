# Setting Up Social Login Integration

Streamline user authentication by enabling social login for GitHub and Drupal.org. This enhances usability while maintaining security.

## Step-by-Step Configuration

1. **Prepare OAuth Credentials**:  
   - GitHub: Create an OAuth application via [GitHub Developer Settings](https://github.com/settings/developers).  
   - Drupal.org: Set up API access via your Drupal.org account.  

2. **Add Credentials to System Settings**:  
   - Update `settings.php` with the obtained client ID and secret for each provider:  

     ```php
     $settings['github']['client_id'] = 'YOUR_CLIENT_ID';
     $settings['github']['client_secret'] = 'YOUR_CLIENT_SECRET';
     ```  

3. **Enable Social Login Modules**:  
   - Ensure the necessary modules (`social_auth_github`, `social_auth_drupal`) are enabled.  

**Testing and Verification**  

- Test logins with dummy accounts to confirm functionality.  
- Check for errors in the logs or use debugging tools if issues arise.
