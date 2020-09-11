# random
Simple function to generate random numbers and post them to a [riff on Knative](https://github.com/projectriff/riff) channel.

### usage

#### deploy the function
```
riff service create random --image jldec/random:v0.0.3
```

#### configure and invoke
Invoking the function will trigger sending posts to the specified url at a fixed inteval. The default frequency is 1/s and the default url is http://echo.default.svc.cluster.local.  

```
riff service invoke random -- -H 'Content-Type:application/json' -d '{"freq":1,"url":"http://square.default.svc.cluster.local"}'
```

