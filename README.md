https://mindsers.blog/post/https-using-nginx-certbot-docker/

1. nginx/conf/default.conf

```nginx
server {
    server_name bruno.sautron.io;

    listen 80;
    listen [::]:80;

    location /.well-known/acme-challenge/ {
       root /var/www/certbot;
    }

    # return 301 https://$server_name$request_uri;

}
```

2.
```sh
$ docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d bruno.sautron.io
```


3. Uncomment this line:
```
# return 301 https://$server_name$request_uri; 
```
and add: 
```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name bruno.sautron.io;

    root /usr/share/nginx/bruno;

    index  index.html index.htm;

    ssl_certificate /etc/letsencrypt/live/bruno.sautron.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bruno.sautron.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```