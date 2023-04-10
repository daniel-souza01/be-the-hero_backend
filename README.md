# How to run

<ol>
<li>
Clone the app:

```
git clone https://github.com/daniel-souza01/be-the-hero_backend.git
```

</li>

<li>
Install all dependencies:

```
yarn
or
npm install
```

</li>

<li>

Copy `.env.example` to `.env` .

</li>

<li>
Create and start the docker container:

```
docker-compose up
```

</li>

<li>
Generate prisma client:

```
npx prisma generate
```

</li>

<li>
Run the migrations:

```
npx prisma migrate dev
```

</li>

<li>
Run application:

```
npm run start:dev

```

</li>
</ol>

# Insomnia doc

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=be%20the%20hero%20backend&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdaniel-souza01%2Fbe-the-hero_backend%2Fmain%2Fdocs%2FInsomnia.json)

# Diagram

<img src="public/diagram.png" alt="app diagram"/>

---
