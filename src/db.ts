import {DataSource} from 'typeorm'
import {User} from './entities/User'

export const AppDataSource = new DataSource({
    type:'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    port: 5432,
    database: 'restcrud',
    entities: [User],
    logging:true,
    synchronize:true
})