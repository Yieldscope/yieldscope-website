# Simplified Partner Inquiry Workflow Setup

## Google Sheets Database Setup

1. **Create a new Google Sheet**: "YieldScope Partner Inquiries"
2. **Set up columns** (Row 1 headers):
   - A: Timestamp
   - B: Company Name
   - C: Contact Name
   - D: Contact Title
   - E: Email Address
   - F: Phone Number
   - G: Company Type
   - H: Partnership Interest
   - I: Message
   - J: Status

3. **Sheet ID**: Copy the sheet ID from the URL for later use

## Google Apps Script Setup

1. Go to script.google.com
2. Create new project: "YieldScope Partner Form Handler"
3. Paste the simplified script code
4. Update these variables:
   - SPREADSHEET_ID
   - EMAIL_ADDRESS (set to sales@yieldscope.app)
5. Deploy as web app
6. Get the deployment URL

## Email Setup

- Uses: `sales@yieldscope.app` (for all email communications)

## What This Does

- ✅ Captures form submissions in Google Sheets
- ✅ Sends confirmation email to prospects
- ✅ Sends notification email to sales@yieldscope.app
- ✅ Simple and reliable workflow 