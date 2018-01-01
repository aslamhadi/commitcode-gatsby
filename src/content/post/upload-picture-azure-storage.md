---
title: Asynchronous upload picture to Azure Storage
date: "2016-08-09T22:12:03.284Z"
tags: ['development', 'c#', 'windows', 'azure']	
---

It's been a while since I use Azure as a server. So many things have changed, now you can use Git as your deployment source, free app service (for testing), push notification hub, etc.

### Azure Storage Definition

* Storage Account: All access to Azure Storage is done through a storage account. This storage account can be a General-purpose storage account or a Blob storage account which is specialized for storing objects/blobs. 

* Container: A container provides a grouping of a set of blobs. All blobs must be in a container. An account can contain an unlimited number of containers. A container can store an unlimited number of blobs. Note that the container name must be lowercase.

* Blob: A file of any type and size

Basically it goes like this: `Account -> Container(s) -> Blob(s)`

### Create Storage Account

You can create the account <a href="https://portal.azure.com/" target="_blank">here</a>. It's pretty straightforward, for more information click <a href="https://azure.microsoft.com/en-us/documentation/articles/storage-create-storage-account/#create-a-storage-account" target="_blank">here</a>.

Then update your Web.Config (for connection string):

```
<appSettings>
  ...other value here...
  <add key="StorageConnectionString" value="yourcredentialhere" />
</appSettings>
```


### Install required packages in NuGet

We need two packages:

* <a href="https://www.nuget.org/packages/WindowsAzure.Storage/" target="_blank">Microsoft Azure Storage Client Library for .NET</a>: This package provides programmatic access to data resources in your storage account.

* <a href="https://www.nuget.org/packages/Microsoft.WindowsAzure.ConfigurationManager/" target="_blank">Microsoft Azure Configuration Manager library for .NET</a>: This package provides a class for parsing a connection string from a configuration file, regardless of where your application is running.

### Dive in to the code

First, create an interface. Here the parameters are the photo, prefix ( I use this for the file name), and photo type. I have several photo types in my projects (e.g. category1, category2, etc) so this is more like the containers name.

```
using System.Threading.Tasks;
using System.Web;

namespace MyProject.Services.Interfaces
{
    public interface IAzureFileUploaderService
    {
        Task<string> UploadPhotoAsync(HttpPostedFileBase photo, string prefix, string photoType);
    }
}
```

And then the implementation. First in the constructor, we must set the storage account so we can connect to the Azure storage based on the credentials we put on Web.Config (line 15–20).

<script src="https://gist.github.com/aslamhadi/a6e061517b86956b903a53fc157f92f7.js"></script>

Entering the photo upload function, first we check if the file is null, then just return null. Don’t need to process further (line 24–27).

Next we check if we have created the container for the particular photo type. If it’s not available, let’s create the container with public access (depends on your need. In my case, since I’m building an API for mobile apps, I want everyone can access the picture).

Next is to create filename. I use Guid so I get unique filename for each picture. Trim the filename, because I don’t want to see %20 in the filename, and then combine all of those.

```
var guid = Guid.NewGuid();
// Remove all space and trim the filename
string fileName = photo.FileName.Replace(" ", string.Empty).Trim();
// Create a unique name for the images we are about to upload
string imageName = string.Format("{0}-{1}-{2}", prefix, guid, fileName);
```

The last process is to actually upload them to Azure Storage and then return the fullPath.

```
CloudBlockBlob blockBlob = container.GetBlockBlobReference(imageName);
blockBlob.Properties.ContentType = photo.ContentType;
await blockBlob.UploadFromStreamAsync(photo.InputStream);                      
fullPath = blockBlob.Uri.ToString();
```

We can save the full path directly to our db and and serve them in the API. :)