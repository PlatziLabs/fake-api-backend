import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'category' })
@Entity()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @CreateDateColumn({
    name: 'creation_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationAt: Date;

  @Field()
  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
