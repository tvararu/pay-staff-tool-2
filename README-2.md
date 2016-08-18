# pay-staff-tool-2

#### Precompile templates

Run the following command to precompile the templates for better client performance

```
node node_modules/nunjucks/bin/precompile app/views/includes/templates/ > app/assets/javascripts/templates.js
```
Need to include with your scripts

```html
<script src="/public/javascripts/templates.js"></script>
```
#### Google Sheets API

This was set up in the Google Console. Config requires a list of the domains the sheet will be accessed from. Currently that is [localhost:3000 and pay-staff-tool-2.herokuapp.com]. If it needs to be used elsewhere remember to add it to that list in Google Console.

##### Snag list

* Can we make precompiling templates automatic??
* Need to watch for template changes too (are they currently caching?)
* cache / improve performance of Google client and sheets libraries
* no refund examples in data and therefore templates

