import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db, schema } from '@acme/db';

const seedFounder = async () => {
    console.log('Seeding founder account...');
  const email = 'testaccount@gmail.com';
  const name = 'Test Account';
  const password = 'TestAccount#$123';

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  await db.insert(schema.users).values({
    id,
    email,
    name,
    emailVerified: new Date(),
    password: hashedPassword,
    userType: 'admin', 
    role: 'admin',
  });

  await db.insert(schema.accounts).values({
    userId: id,
    type: 'credentials',
    provider: 'email',
    providerAccountId: email,
  });

  console.log('Founder account seeded successfully');
};

seedFounder().catch(console.error);