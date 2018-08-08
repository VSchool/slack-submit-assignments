import React, { Fragment } from 'react';

//components
import { Div } from "./Home";
import Nav from "../organisms/Nav";
import H1 from "../atoms/H1";
import H3 from "../atoms/H3";
import P from "../atoms/P";
import Span from "../atoms/Span";
import DataMenu from "../organisms/DataMenu";
import Button from "../atoms/Button";
import Clipboard from "../containers/Clipboard";

import { filterSearch } from "../molecules/Search";
import { handleSearch, markStatus } from "../riddl/submissions";

//state
import { connect } from "riddl-js";

const StyledDiv = Div.extend`
grid-template-areas : 
    "nav nav nav nav" 
    "hdr hdr hdr hdr"
    "sbhdr sbhdr sbhdr sbhdr"
    "menu menu menu menu"
    "ass url status date"; 
`

function StudentPage({ student, channel, loading, data, sortBy, filterBy, searchTerm, handleSearch, markStatus }) {
    return (
        <StyledDiv>
            <Nav />
            {loading ?
                <P grid gridArea="hdr">Waiting for student data</P> :
                student ?
                    <Fragment>
                        <H1>{student.name}</H1>
                        <div style={{ gridArea: "sbhdr", padding: "3px", marginBottom: "24px" }}>
                            <H3>Slack ID: <Span>{student.slackId}</Span></H3>
                            <H3>Channel: <Span>{channel.name}</Span></H3>
                        </div>
                    </Fragment> :
                    <P grid gridArea="hdr">No data</P>
            }
            <DataMenu />
            <H3 gridArea="ass">Assignment</H3>
            <H3 gridArea="url">Github</H3>
            <H3 gridArea="status">Status</H3>
            <H3 gridArea="date">Date</H3>
            {loading ?
                <P grid>Waiting for student submissions</P> :
                data.filter(sub => filterSearch(sub, searchTerm)).filter(sub => sub.student.slackId === student.slackId && filterBy(sub)).sort(sortBy).map((submission, i) => {
                    const date = new Date(submission.createdAt);
                    return (
                        <Fragment key={submission._id}>
                            <P onClick={() => handleSearch(submission.assignmentName)} hasIcon completed={submission.completed} table gridColumn="1">{submission.assignmentName}</P>
                            <Clipboard url={submission.githubUrl} render={({ input, handleClick }) => (
                                <P hasIcon onClick={handleClick} completed={submission.completed} table gridColumn="2">&#x2398; {input}</P>
                            )} />
                            <P onClick={() => markStatus(submission._id, !submission.completed)} hasIcon completed={submission.completed} table gridColumn="3">{submission.completed ? "&#10003;".replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)) : "&#8861;".replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}</P>
                            <P hasIcon completed={submission.completed} table gridColumn="4">{`${date.getMonth()}/${date.getDay()}`}</P>
                        </Fragment>
                    )
                })
            }
        </StyledDiv>
    )
}

export default connect(StudentPage, state => state.submissions, { handleSearch, markStatus });
