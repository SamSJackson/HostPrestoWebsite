import { TextSnippetRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

import './main.scss';

type Props = {
    onSubmit: (name : string, text : string) => void;
};

const UpdateSubmit: React.FC<Props> = ({
    onSubmit
}) => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(false);
    
    useEffect(() => {
        if (text != "" && name != "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, text]);
    
    const handleNameChange = (event : React.FormEvent<HTMLInputElement>) => {
        setName((event.target as HTMLInputElement).value);
    }
    
    const handleTextChange = (event : React.FormEvent<HTMLTextAreaElement>) => {
        setText((event.target as HTMLTextAreaElement).value);
    }


    const handleSubmit = async (event : React.SyntheticEvent) => {
        event.preventDefault();
        await onSubmit(name, text);
        const formElement = document.getElementById("update-status-submit");
        if (formElement == null) { return; }
        (formElement as HTMLFormElement).reset();
        setText(""); setName("");
    }

    return (
        <div className="updates-footer">
            <form id="update-status-submit" onSubmit={handleSubmit}>
                <div className="updates-footer-flex">
                    <div>
                        <input type="text" id="author" name="author" placeholder="Name" onChange={handleNameChange}/>
                    </div>
                    <div>
                        <textarea id="textarea" className="textarea" contentEditable="true" placeholder="New status" onChange={handleTextChange}/>
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