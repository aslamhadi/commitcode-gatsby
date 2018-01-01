---
title: Custom REST authorization in ASP.Net MVC
date: "2016-10-01T22:12:03.284Z"
tags: ['development', 'asp.net-mvc']	
---

So I have a situation to check if user that accesses the API is not registered, then return JSON with 401 http code, else return JSON with required data.

ASP.Net MVC has a class called AuthorizeAttribute. This class specifies that access to a controller or action method is restricted to users who meet the authorization requirement. In this scenario, to create a custom authorization, we need to create a class that inherits from this one.

*<strong>Note</strong>: the whole code is available [here](https://gist.github.com/aslamhadi/a080cefe2d91792a34a79ffd9d8ab5b9)

### Authorization method

First we override `OnAuthorization` method. Basic stuff, check if user is authorized, if not passed then handle it.

```
public override void OnAuthorization(AuthorizationContext filterContext)
{
    if (Authorize(filterContext))
    {
        return;
    }

    HandleUnauthorizedRequest(filterContext);
}
```

### How do we authorize? 

In my case, I check the header in the request. If it contains the right token, then return true

```
private bool Authorize(AuthorizationContext actionContext)
{
    try
    {
        HttpRequestBase request = actionContext.RequestContext.HttpContext.Request;
        string token = request.Headers[SecurityToken];

        return _authApiService.ValidateToken(token);
    }
    catch (Exception)
    {
        return false;
    }
}
```

### Handle Unauthorized message

```
protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
{
    //base.HandleUnauthorizedRequest(filterContext);
    var unauthorizedResult = new JsonResult();
    var resultJson = new ApiModel(Global.ErrorGetToken, 401, Global.UnAuthorized, null);
    unauthorizedResult.Data = resultJson;
    unauthorizedResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
    filterContext.Result = unauthorizedResult;
}
```

First we need to create a JSON object with [JsonResult](https://msdn.microsoft.com/en-us/library/system.web.mvc.jsonresult(v=vs.118).aspx). And then next next basically we send 401 http status code and a message "You shall not pass!" 

<img class="pure-img-responsive" src="http://i.giphy.com/njYrp176NQsHS.gif" />

### How to use it

Create a new controller in ASP.Net MVC, add header `RestAuthorize`. Just like that :)

```
public class YourApiController : Controller
{
    [RestAuthorize]
    public ActionResult Index()
    {
        ...
    }
}
```

This is the result if the request is not authorized:

```
{
  "code": "ERROR_GET_TOKEN",
  "respond": 401,
  "message": "UNAUTHORIZED",
  "content": null
}
```