import React from 'react';

import { Status } from '../../../constants/Status';
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
    const createdAt = formatTime(status.createdAt);

    const handleDelete = async () => {
        await onDelete(status._id);
    }

    return (
        <div className="status-option">
            <div className="status-option-header">
                <div className="content">
                    {status.author}
                </div>
                <div className="content">
                    {createdAt}
                </div>
                <div className="content">
                    <DeleteIcon onClick={handleDelete}/>
                </div>
            </div>
            <hr className="status-option-divider" />
            <div className="status-option-body">
                {status.text}
            </div>
        </div>
    )
}

export default UpdateOption;