import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@db/entities/user.entity';
import { Role } from '@models/roles';
import { generateImage } from '@utils/generate-img';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(User);
    await repository.save([
      {
        id: 1,
        email: 'john@mail.com',
        password: 'changeme',
        name: 'Jhon',
        role: Role.customer,
        avatar: generateImage('face'),
      },
      {
        id: 2,
        email: 'maria@mail.com',
        password: '12345',
        name: 'Maria',
        role: Role.customer,
        avatar: generateImage('face'),
      },
      {
        id: 3,
        email: 'admin@mail.com',
        password: 'admin123',
        name: 'Admin',
        role: Role.admin,
        avatar: generateImage('face'),
      },
    ]);

    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(5);
  }
}
