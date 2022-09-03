import { createContext } from 'react';
import { UserInfo } from '../util/auth';

const UserContext = createContext<UserInfo>({ username : "", auth_id: ""});

export default UserContext;