var appBll = angular.module("appBll", []);

appBll.factory("appConfig", new clsAppConfig());

appBll.factory("bll", function ($http, appConfig) {
    var oRequest = new clsRequest($http,appConfig);
    
    return oRequest;
});

