import { Prop, Schema } from '@nestjs/mongoose';

enum Role {
  user = 'USER',
  admin = 'ADMIN',
  contributor = 'CONTRIBUTOR',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: Role;
}
