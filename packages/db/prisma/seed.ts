import { createSeedClient } from '@snaplet/seed';

async function main() {
  const seed = await createSeedClient();

  // Seed the database with 10 users
  await seed.user((x) =>
    x(10, {
      role: 'USER',
      orders: (order) =>
        order(1, {
          payments: [{}],
          courseId: 'cmca9f1ir00007si4e4txrnlc',
        }),
    }),
  );
}

main()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
