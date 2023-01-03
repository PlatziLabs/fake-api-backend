import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '@db/entities/category.entity';
import { Transform } from 'class-transformer';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ description: 'product ' })
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  description: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Field(() => [String])
  @Transform(({ value }) => (value === '' ? [] : JSON.parse(value)))
  @Column()
  images: string;

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
}
