import { knex as knexModule } from 'knex';
import knexfile from '../knexfile';

const knex = knexModule(knexfile.development);
export default knex;
