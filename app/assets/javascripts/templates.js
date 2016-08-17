(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["details-item.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<table>\n  <tbody>\n    <tr>\n      <td>Reference number:</td> \n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "reference"), env.opts.autoescape);
output += "</td>\n    </tr>\n    <tr>\n      <td>Email address:</td> \n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "email"), env.opts.autoescape);
output += "</td>\n    </tr>\n    <tr>\n      <td>Amount:</td>\n      <td>£";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "amount"), env.opts.autoescape);
output += ".00</td>\n    </tr>\n    <tr>\n      <td>Status:</td> \n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "status"), env.opts.autoescape);
output += "</td>\n    </tr>\n    <tr>\n      <td>Type:</td>\n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "card"), env.opts.autoescape);
output += "</td>\n    </tr>\n    <tr>\n      <td>Provider:</td>\n      <td>Barclays</td>\n    </tr>\n    <tr>\n      <td>Time:</td>\n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "startDate"), env.opts.autoescape);
output += "</td>\n    </tr>\n    <tr>\n      <td>Transaction ID:</td>\n      <td>20150602153345</td>\n    </tr>\n    <tr>\n      <td>GOV.UK payment ID:</td> \n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "payId"), env.opts.autoescape);
output += "</td>\n    </tr>\n  </tbody>\n</table>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["list-item.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<tr class='clickable-row' data-href='/sheets-detail#";
output += runtime.suppressValue(env.getFilter("default").call(context, runtime.contextOrFrameLookup(context, frame, "row"),"1"), env.opts.autoescape);
output += "'>\n  <td><a href=\"/sheets-detail#";
output += runtime.suppressValue(env.getFilter("default").call(context, runtime.contextOrFrameLookup(context, frame, "row"),"1"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "reference"), env.opts.autoescape);
output += "</a></td>\n  <td>";
output += runtime.suppressValue(env.getFilter("truncate").call(context, runtime.contextOrFrameLookup(context, frame, "email"),20), env.opts.autoescape);
output += "</td>\n  <td>£";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "amount"), env.opts.autoescape);
output += ".00</td>\n  <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "card"), env.opts.autoescape);
output += "</td>\n  <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "status"), env.opts.autoescape);
output += "\n    ";
if(runtime.contextOrFrameLookup(context, frame, "status") == "Failed") {
output += "\n    <span class=\"error-code\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "subStatus"), env.opts.autoescape);
output += "</span>\n    ";
;
}
output += "\n  </td>\n  <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "startDate"), env.opts.autoescape);
output += "</td>\n</tr>\n\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["transaction-events.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<table>\n  <tbody>\n    <tr>\n      <td>Authorisation succeeded</td>\n      <td>£";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "amount"), env.opts.autoescape);
output += ".00</td> \n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "authSucceed"), env.opts.autoescape);
output += "</td>\n    </tr>\n    <tr>\n      <td>Card details submitted for authorisation</td>\n      <td>£";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "amount"), env.opts.autoescape);
output += ".00</td> \n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "authSubmit"), env.opts.autoescape);
output += "</td>\n    </tr>\n    <tr>\n      <td>User entering card details</td>\n      <td>£";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "amount"), env.opts.autoescape);
output += ".00</td> \n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "startEnter"), env.opts.autoescape);
output += "</td>\n    </tr>\n    <tr>\n      <td>Payment created</td>\n      <td>£";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "amount"), env.opts.autoescape);
output += ".00</td> \n      <td>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "startDate"), env.opts.autoescape);
output += "</td>\n    </tr>\n  </tbody>\n</table>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

