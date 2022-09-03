import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../../contexts/UserContext';

import './main.scss';

type Props = {
    onSubmit: (name : string, text : string) => void;
};

const UpdateSubmit: React.FC<Props> = ({
    onSubmit
}) => {
    const name = useContext(UserContext).username;
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(false);
    
    useEffect(() => {
        if (text !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [text]);
    
    const handleTextChange = (event : React.FormEvent<HTMLTextAreaElement>) => {
        setText((event.target as HTMLTextAreaElement).value);
    }


    const handleSubmit = async (event : React.SyntheticEvent) => {
        event.preventDefault();
        await onSubmit(name, text);
        const formElement = document.getElementById("update-status-submit");
        if (formElement == null) { return; }
        (formElement as HTMLFormElement).reset();
        setText("");
    }

    return (
        <div className="updates-footer">
            <form id="update-status-submit" className="updates-footer-form" onSubmit={handleSubmit}>
                <div className="updates-footer-flex">
                    <div className="updates-textarea">
                        <textarea id="textarea" className="textarea" placeholder="New status" onChange={handleTextChange}/>
                    </div>
                </div>
                <div className="updates-footer-submit">
                    <input id="status-submit-button" type="submit" value="Submit" disabled={disabled}/>
                </div>
            </form>
        </div>
    );
};

export default UpdateSubmit;