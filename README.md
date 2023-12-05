# Order Management

## Installation

Clone repositories

```
git clone https://github.com/dabhekarankit/order-management.git
```

Run below commands for copy .env.example => .env

```
copy .env.example .env
```

Run below command for install all packages

```
npm i
```

Set DB config in .env file

```
DB_CONNECTION=mysql
DB_PORT=3306
DB_HOST=127.0.0.1
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=order-management
```

For migration run below commands

```
npm run migrate         // For exicute migration
npm run migrate:undo    // For revert the migration
```

Run project suing nodemon

```
npm run start:local
```

Run project using pm2

```
npm run start
```

Open in chrome for local

```
http://localhost:{YOUR_PORT}/api/documentation
```

Open in chrome for live

```
http://{YOUR_HOST_URL}:{YOUR_PORT}
```
