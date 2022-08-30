import React, { useContext } from 'react';

import UpdateOption from './UpdateOption'; 
import UpdateSubmit from './UpdateSubmit';

import StatusContext from '../../contexts/StatusContext';
import { Status } from '../../constants/Status';
import { addStatus, deleteStatus } from '../../api';

import './main.scss';

type Props = {
    onSubmit: (status: Status) => void;
    onRemove: (statusId : number) => void;
}

const Updates : React.FC<Props> = ({
    onSubmit,
    onRemove,
}) => {
    const statusArray = useContext(StatusContext);

    const handleSubmit = async (name : string, text : string) => {
        const statusPromise = addStatus(text, name);
        statusPromise.then((newStatus) => {
            onSubmit(newStatus);
        });
    }

    const handleDelete = async (statusId : number) => {
        onRemove(statusId);
        await deleteStatus(statusId);
    };

    return (
        <div id="update-container-primary" className="updates-container">
            <div className="updates-container-statuses">
                {statusArray.map((status) => (
                    <UpdateOption
                        key={status._id}
                        status={status}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <UpdateSubmit
                onSubmit={handleSubmit}
             />
        </div>
    );
};

export default Updates;