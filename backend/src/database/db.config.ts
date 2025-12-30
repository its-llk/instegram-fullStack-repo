

import { DataSourceOptions } from 'typeorm';
import { Likes } from './likesEntity';
import { Users } from './usersEntity';
import { Posts } from './postsEntity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
      host: 'logmartemplate.cjo4y2jzzy7c.il-central-1.rds.amazonaws.com',
      entities: [Likes,Users,Posts],
      port: 5432,
      username: 'logmartemplateadmin',
      password: '9{6CuP-6X}st8JdJ',
      database: 'postgres',
      schema: 'liam-katabi',
      logging: true,
      synchronize: false,       
};
