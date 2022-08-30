import { createContext } from 'react';

import { Status } from '../constants/Status';

const StatusContext = createContext<Status[]>([]);

export default StatusContext;

