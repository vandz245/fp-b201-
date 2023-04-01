# Review API

Review API adalah API yang bisa anda gunakan untuk memposting tulisan yang anda buat. API ini dibuat dengan menggunakan Typescript, Express.js, dan MongoDB. API ini sudah menerapkan authentikasi dan authorizasi berupa JWT token pada beberapa operasi CRUD di endpoint. Untuk melakukan request, dapat dilakukan dengan mengakses ip address berikut:

IP: 127.0.0.1

Endpointnya antara lain:

1. 127.0.0.1/api/users
2. 127.0.0.1/api/sessions   (Get dan Delete butuh authorizasi)
3. 127.0.0.1/api/products   (Post, Update, dan Delete butuh authorizasi)

Dokumentasinya berupa Postman-Collection dan Open-API
