---
title: Fix Guava and HBase conflict in Play Framework
date: "2016-06-28T22:12:03.284Z"
tags: ['development', 'play-framework', 'hbase']
---

I'm using Play Framework 2.4 and the requirement is I need to update HBase directly from the web. So we need to add some HBase dependencies in the `build.sbt` file.

```
lazy val hbaseDependencies = Seq(
  "org.apache.hbase" % "hbase" % "1.0.0-cdh5.5.0" % "provided",
  "org.apache.hbase" % "hbase-server" % "1.0.0-cdh5.5.0" % "provided",
  "org.apache.hbase" % "hbase-common" % "1.0.0-cdh5.5.0" % "provided",
  "commons-collections" % "commons-collections" % "3.2.1",
  "commons-configuration" % "commons-configuration" % "1.7",
  "com.google.protobuf" % "protobuf-java" % "2.5.0",
  "org.apache.htrace" % "htrace-core" % "3.2.0-incubating",
  "org.apache.htrace" % "htrace-core4" % "4.0.1-incubating",
  "org.cloudera.htrace" % "htrace-core" % "2.00"
)
```

The problem is, HBase is using earlier version of `guava` while Play Framework is using the new one. In Guava version 17, they changed the constructor to package private. That's why you will see an error when trying to update HBase table. This is code changes in guava : <a target="_blank" href="https://github.com/google/guava/commit/fd0cbc2c5c90e85fb22c8e86ea19630032090943">https://github.com/google/guava/commit/fd0cbc2c5c90e85fb22c8e86ea19630032090943</a>

So in order to fix this, we need to override the `guava` version to use the earlier version.

```
libraryDependencies ++= yourDependencies ++ hbaseDependencies
dependencyOverrides += "com.google.guava" % "guava" % "16.0.1"
```