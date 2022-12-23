import { setSeederFactory } from 'typeorm-extension';
import { User } from '@db/entities/user.entity';
import { Role } from '@models/roles';
import { generateImage } from '@utils/generate-img';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.role = Role.customer;
  user.avatar = generateImage('face');
  user.name = faker.name.firstName();
  return user;
});
