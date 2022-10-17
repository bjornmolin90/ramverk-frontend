import React from 'react';
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function Invite(props) {
    const msg = {
        to: 'bjornmolin90@hotmail.com',
        from: 'bjmo21@student.bth.se', // Use the email address or domain you verified above
        subject: 'Invitation to edit document',
        text: "hej" + props.currentDoc[0].name,
    };

    return (
        <button onClick={() => sendMail(msg)}>
            Invite
        </button>
    );
}

export default Invite;


//ES8
const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body);
        }
    }
};
