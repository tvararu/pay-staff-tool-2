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


##### Snag list

* Can we make precompiling templates automatic??
* Need to watch for template changes too (are they currently caching?)
* refactor js, no need for both data-app.js and data-app-details.js
* cache / improve performance of Google client and sheets libraries
* no refund examples in data and therefore templates

