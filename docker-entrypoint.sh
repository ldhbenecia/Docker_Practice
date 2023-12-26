# Local
npx prisma migrate dev --name init
node dist/main.js

# Production
# npx prisma migrate deploy
# node dist/main.js