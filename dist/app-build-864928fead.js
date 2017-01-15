"bundle";!function(){var a=System.amdDefine;a("app.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="./templates/nav-bar.html"></require><nav-bar router.bind="router"></nav-bar><div class="container"><router-view></router-view></div></template>'})}(),System.register("app.js",[],function(a,b){"use strict";var c;b&&b.id;return{setters:[],execute:function(){c=function(){function a(){}return a.prototype.configureRouter=function(a,b){a.title="Simple Aurelia App",a.map([{route:"",name:"home",moduleId:"home",title:"Home"},{route:"unexpected-error",name:"unexpected-error",moduleId:"templates/unexpected-error/unexpected-error",title:"Unexpected error"}]),this.router=b},a}(),a("App",c)}}}),function(){var a=System.amdDefine;a("home.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="./resources/elements/currency-converter"></require><div class="page-header"><h2>Currency Converter</h2></div><currency-converter rates.bind="currencyRates"></currency-converter></template>'})}(),System.register("services/exchange-rate-service.js",["aurelia-framework","aurelia-fetch-client","fetch","config/app.config.json!json"],function(a,b){"use strict";var c,d,e,f,g=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},h=this&&this.__metadata||function(a,b){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(a,b)};b&&b.id;return{setters:[function(a){c=a},function(a){d=a},function(a){},function(a){e=a}],execute:function(){f=function(){function a(a){this.httpClient=a,a.configure(function(a){a.useStandardConfiguration().withBaseUrl(e["default"].api.url)})}return a.prototype.getCurrentExchangeRates=function(){return this.httpClient.fetch(e["default"].api.resource.exchangeRates+"A/").then(function(a){return a.json()}).then(function(a){return a[0]})},a}(),f=g([c.autoinject,h("design:paramtypes",[d.HttpClient])],f),a("default",f)}}}),System.register("home.js",["aurelia-framework","aurelia-router","./services/exchange-rate-service"],function(a,b){"use strict";var c,d,e,f,g=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},h=this&&this.__metadata||function(a,b){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(a,b)};b&&b.id;return{setters:[function(a){c=a},function(a){d=a},function(a){e=a}],execute:function(){f=function(){function a(a,b){this.exchangeRateService=a,this.router=b,this.currencyRates=[{code:"PLN",currency:"Polish Zloty",mid:1},{code:"USD",currency:"US Dollar"},{code:"GBP",currency:"British Pound"},{code:"EUR",currency:"Euro"}]}return a.prototype.activate=function(){var a=this;return this.exchangeRateService.getCurrentExchangeRates().then(function(b){return a.mapCurrentRateValues(b.rates)})["catch"](function(){a.router.navigateToRoute("unexpected-error")})},a.prototype.mapCurrentRateValues=function(a){this.currencyRates.forEach(function(b){var c=a.find(function(a){return a.code===b.code});c&&(b.mid=c.mid)})},a}(),f=g([c.autoinject,h("design:paramtypes",[e["default"],d.Router])],f),a("Home",f)}}}),System.register("main.js",["bootstrap-sass","config/app.config.json!json"],function(a,b){"use strict";function c(a){a.use.standardConfiguration(),d["default"].debug&&a.use.developmentLogging(),a.start().then(function(){return a.setRoot()})}b&&b.id;a("configure",c);var d;return{setters:[function(a){},function(a){d=a}],execute:function(){}}}),System.register("resources/attributes/vertical-class-switcher.js",["aurelia-framework"],function(a,b){"use strict";var c,d,e,f=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},g=this&&this.__metadata||function(a,b){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(a,b)};b&&b.id;return{setters:[function(a){c=a}],execute:function(){d=e=function(){function a(a){var b=this;this.element=a,this.isTicking=!1,this.onScrollChange=function(){b.isTicking||window.requestAnimationFrame(function(){b.checkElementPosition(),b.isTicking=!1}),b.isTicking=!0}}return a.prototype.attached=function(){window.addEventListener(e.ScrollEventName,this.onScrollChange),this.onScrollChange()},a.prototype.detached=function(){window.removeEventListener(e.ScrollEventName,this.onScrollChange)},a.prototype.checkElementPosition=function(){var a=$(this.element).offset().top,b=$(window).scrollTop(),c=$(window).height(),d=a-b<c/2;d?($(this.element).removeClass(this.up),$(this.element).addClass(this.down)):($(this.element).removeClass(this.down),$(this.element).addClass(this.up))},a}(),d.ScrollEventName="scroll",f([c.bindable,g("design:type",String)],d.prototype,"up",void 0),f([c.bindable,g("design:type",String)],d.prototype,"down",void 0),d=e=f([c.customAttribute("vertical-class-switcher"),c.autoinject(),g("design:paramtypes",[Element])],d),a("VerticalClassSwitcher",d)}}}),function(){var a=System.amdDefine;a("resources/elements/currency-converter.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="./currency-dropdown"></require><div class="row"><div class="col-md-12"><p><strong>Currency I Have</strong></p></div></div><div class="row"><div class="col-md-3 col-sm-5 exchange-group"><div class="row"><div class="col-md-12"><currency-dropdown currencies.bind="rates" selected.two-way="fromCurrency"></currency-dropdown></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="amountFrom">Amount:</label><input id="amountFrom" type="number" min="0" step="100" class="form-control" value.bind="fromAmount" keyup.delegate="fromChanged()" change.delegate="fromChanged()"></div></div></div></div><div class="col-md-1 col-sm-2 exchange-icon"><span class="glyphicon glyphicon-triangle-left"></span> <span class="glyphicon glyphicon-triangle-right"></span></div><div class="col-md-3 col-sm-5 exchange-group"><div class="row"><div class="col-md-12"><currency-dropdown currencies.bind="rates" selected.two-way="toCurrency"></currency-dropdown></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="amountTo">Amount:</label><input id="amountTo" type="number" min="0" step="100" class="form-control" value.bind="toAmount" keyup.delegate="toChanged()" change.delegate="toChanged()"></div></div></div></div></div></template>'})}(),System.register("resources/elements/currency-converter.js",["aurelia-framework"],function(a,b){"use strict";var c,d,e=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},f=this&&this.__metadata||function(a,b){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(a,b)};b&&b.id;return{setters:[function(a){c=a}],execute:function(){d=function(){function a(a){this.element=a,this.rates=[]}return a.prototype.ratesChanged=function(){this.rates.length>=2&&(this.fromCurrency=this.rates[0],this.toCurrency=this.rates[1])},a.prototype.fromChanged=function(){if(this.fromAmount){var a=+this.fromAmount*(this.fromCurrency.mid/this.toCurrency.mid);this.toAmount=this.toFixedValue(a)}},a.prototype.toChanged=function(){if(this.toAmount){var a=+this.toAmount*(this.toCurrency.mid/this.fromCurrency.mid);this.fromAmount=this.toFixedValue(a)}},a.prototype.toFixedValue=function(a){return(+a.toFixed(2)).toString()},a}(),e([c.bindable,f("design:type",Array)],d.prototype,"rates",void 0),e([c.observable({changeHandler:"fromChanged"}),f("design:type",Object)],d.prototype,"fromCurrency",void 0),e([c.observable({changeHandler:"toChanged"}),f("design:type",Object)],d.prototype,"toCurrency",void 0),d=e([c.customElement("currency-converter"),c.autoinject(),f("design:paramtypes",[Element])],d),a("CurrencyConverter",d)}}}),function(){var a=System.amdDefine;a("resources/elements/currency-dropdown.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><require from="../attributes/vertical-class-switcher"></require><div class="btn-group dropdown clearfix input-width-full" vertical-class-switcher="up: dropup; down: dropdown"><button type="button" class="btn btn-input btn-default dropdown-toggle form-control" data-toggle="dropdown"><img src="/images/${ selected.code }.png" alt="${selected.code}"> <span>${ selected.currency }</span> <span class="caret pull-right"></span> <span class="pull-right">${ selected.code }</span></button><ul class="dropdown-menu scrollable-dropdown-menu input-width-full" role="menu"><li repeat.for="currency of currencies" class="${ currency.code === selected.code ? \'active\' : \'\' }"><a href="javascript:void(0);" click.trigger="selected = currency"><img src="/images/${ currency.code }.png" alt="${selected.code}"> <span>${ currency.currency }</span> <span class="pull-right">${ currency.code }</span></a></li></ul></div></template>'})}(),System.register("resources/elements/currency-dropdown.js",["aurelia-framework","bootstrap-sass"],function(a,b){"use strict";var c,d,e=this&&this.__decorate||function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g},f=this&&this.__metadata||function(a,b){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(a,b)};b&&b.id;return{setters:[function(a){c=a},function(a){}],execute:function(){d=function(){function a(a){this.element=a,this.currencies=[]}return a.prototype.attached=function(){!this.selected&&this.currencies.length>0&&(this.selected=this.currencies[0])},a}(),e([c.bindable,f("design:type",Array)],d.prototype,"currencies",void 0),e([c.bindable,f("design:type",Object)],d.prototype,"selected",void 0),d=e([c.customElement("currency-dropdown"),c.autoinject(),f("design:paramtypes",[Element])],d),a("CurrencyDropdown",d)}}}),function(){var a=System.amdDefine;a("templates/nav-bar.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template bindable="router"><nav class="navbar navbar-default navbar-fixed-top" role="navigation"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"><span class="sr-only">Toggle Navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="/"><i class="fa fa-home"></i> <span>${router.title}</span></a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><ul class="nav navbar-nav navbar-right"><li class="loader" if.bind="router.isNavigating"><i class="fa fa-spinner fa-spin fa-2x"></i></li><li><a href="https://github.com/matik12/simple-aurelia-app"><i class="fa fa-github"></i> GitHub</a></li></ul></div></div></nav></template>'})}(),function(){var a=System.amdDefine;a("templates/unexpected-error/unexpected-error.html!github:systemjs/plugin-text@0.0.8.js",[],function(){return'<template><div class="page-header"><h2>Unfortunately an unexpected error has occurred.</h2></div><div class="row"><div class="col-md-12"><p>You can try refreshing the page, the problem may be temporary.</p><h6>Error 500</h6></div></div></template>'})}(),System.register("templates/unexpected-error/unexpected-error.js",[],function(a,b){"use strict";var c;b&&b.id;return{setters:[],execute:function(){c=function(){function a(){}return a}(),a("UnexpectedError",c)}}});