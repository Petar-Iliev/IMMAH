import React, { useState } from 'react';
import {Redirect} from 'react-router-dom'

function CompanyFooter({ mustLog, adminComments, comments, submitComment, voting, vote }) {


    console.log(adminComments);
    console.log(comments);


    const [commentInput, setCommentInput] = useState('');
    const [adminComm, setAdminComm] = useState(false);



    function handleCommentInput(e) {
        setCommentInput(e.target.value);
    }

    async function handleComment() {
        if (commentInput.trim().length > 0) {
            await submitComment(commentInput);
            setCommentInput('');
        }
    }

    function dateDesOrder(a, b) {
        let d1 = new Date(a.created_on);
        let d2 = new Date(b.created_on);

        return d2 - d1;
    }


    function handleAdminUserComments(e) {
        console.log(e.target.innerHTML);

        if (!adminComm) {
            e.target.innerHTML = "USER COMMENTS";
        } else {
            e.target.innerHTML = "ADMIN COMMENTS";
        }

        setAdminComm(!adminComm);
    }

   


    return (
        <div className="company-footer-root">

            {voting &&
                <div className="voting">
                    <h3>VOTE IF YOU THINK IT'S LEGIT OR FAKE</h3>
                    {mustLog && <h4>You must be logged in to vote !</h4>}
                    <span onClick={() => {
                        vote(true)
                    }}>LEGIT</span>
                    <span onClick={() => {
                        vote(false);
                    }}>FAKE</span>
                </div>
            }
            <div className="comment-input-wrapper">
                <input onChange={handleCommentInput} placeholder="Write a comment..." value={commentInput} />
                <div className="comment-btn" onClick={handleComment}>Comment</div>
            </div>

            <span className='toggle-admin-coms' onClick={handleAdminUserComments}>ADMIN COMMENTS</span>

            {!adminComm ? comments.sort(dateDesOrder).map((comment, index) =>
                <div className="comment" key={index}>

                    <h4>{comment.author_name}</h4>
                    <p>{comment.message}</p>
                </div>) :

                adminComments.sort(dateDesOrder).map((comment, index) =>
                    <div className="comment" key={index}>
                        ADMIN
        <h4>{comment.author_name}</h4>
                        <p>{comment.message}</p>
                    </div>)

            }


        </div>
    )
}

export default CompanyFooter;