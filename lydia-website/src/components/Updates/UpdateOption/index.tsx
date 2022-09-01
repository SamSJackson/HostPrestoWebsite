import React, { useContext } from 'react';

import { Status } from '../../../constants/Status';
import TimeContext from '../../../contexts/TimeContex';
import DeleteIcon from '../../../static/svg/DeleteIcon';
import { formatTime } from '../../../util/time';

import './main.scss';

type Props = {
    status: Status,
    onDelete: (status : number) => void,
};

const UpdateOption: React.FC<Props> = ({
    status,
    onDelete,
}) => {
    console.log(`Update option: ${status.createdAt}`);
    const createdAt = formatTime(status.createdAt);

    const handleDelete = async () => {
        await onDelete(status._id);
    }

    return (
        <div className="status-option">
            <div className="status-option-header">
                <div className="content text">
                    {status.author}
                </div>
                <div className="content text">
                    {createdAt}
                </div>
                <div className="content">
                    <DeleteIcon onClick={handleDelete}/>
                </div>
            </div>
            <hr className="status-option-divider" />
            <div className="status-option-body">
                <pre>{status.text}</pre>
            </div>
        </div>
    )
}

export default UpdateOption;