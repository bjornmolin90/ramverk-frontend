import React from 'react';

function Invite(props) {
    let docName = "register for the document handler on: ";

    if (props.currentDoc instanceof Array) {
        docName = 'edit document: ' + props.currentDoc[0].name + ' on: ';
    }

    function changeHandler(event) {
        props.setEmail(event.target.value);
    }

    const msg = {
        to: props.email,
        from: 'bjmo21@student.bth.se', // Use the email address or domain you verified above
        subject: 'Invitation to edit document',
        html: `<p>You have been invited to ${docName}</p>
            <a href="https://www.student.bth.se/~bjmo21/editor/">Dokumenthanteraren</a>`,
    };

    return (
        <div>
            <label>
                Email:
                <br></br>
                <input data-testid="emailField" onChange={changeHandler} type="email" name="Email"/>
            </label>
            <button data-testid="button" onClick={() => props.sendMail(msg)}>Invite</button>
        </div>
    );
}

export default Invite;
