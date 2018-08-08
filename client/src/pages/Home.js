import React, { Fragment } from 'react';
import styled, { colors, media } from "../styles";

//components
import Nav from "../organisms/Nav";
import H1 from "../atoms/H1";
import H3 from "../atoms/h3";
import P, { DisguisedLink } from "../atoms/P";
import DataMenu from "../organisms/DataMenu";
import Clipboard from "../containers/Clipboard";

//search
import { filterSearch } from "../molecules/Search";
import { handleSearch, markStatus } from "../riddl/submissions";

//state
import { connect } from "riddl-js";

export const Div = styled.div`
    display: grid;
    margin: auto;
    width: 95%;
    background-color: ${colors.primary.light};
    grid-template-columns: 35% 15% 20% 30%;
    grid-template-areas : 
        "nav nav nav nav" 
        "hdr hdr hdr hdr"
        "menu menu menu menu"
        "ass url status student"; 
    ${media.tablet`
        width: 90%;
    `}
    ${media.tabletHoriz`
        width: 80%;
    `}
    ${media.desktop`
        width: 60%;
    `}
`

function Home({ match, location, history, children, data, loading, filterBy, sortBy, searchTerm, handleSearch, markStatus, ...props }) {
    return (
        <Div {...props}>
            <Nav />
            <H1>Submissions</H1>
            <DataMenu />
            <H3 gridArea="ass">Assignment</H3>
            <H3 gridArea="url">Github</H3>
            <H3 gridArea="status">Status</H3>
            <H3 gridArea="student">Student</H3>
            {loading ?
                <P grid>Waiting for student submissions</P> :
                data.filter(sub => filterSearch(sub, searchTerm)).filter(filterBy).sort(sortBy).map((submission, i) => (
                    <Fragment key={submission._id}>
                        <P onClick={() => handleSearch(submission.assignmentName)} hasIcon completed={submission.completed} table gridColumn="1">{submission.assignmentName}</P>
                        <Clipboard url={submission.githubUrl} render={({ input, handleClick }) => (
                            <P hasIcon onClick={handleClick} completed={submission.completed} table gridColumn="2">&#x2398; {input}</P>
                        )} />
                        <P onClick={()=> markStatus(submission._id, !submission.completed)}hasIcon completed={submission.completed} table gridColumn="3">{submission.completed ? "&#10003;".replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)) : "&#8861;".replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}</P>
                        <DisguisedLink onClick={() => history.push(`/students/${submission._id}`)} hasIcon completed={submission.completed} table gridColumn="4">{submission.student.name}</DisguisedLink>
                    </Fragment>
                ))
            }
        </Div>
    )
}

export default connect(Home, state => state.submissions, { handleSearch, markStatus });
