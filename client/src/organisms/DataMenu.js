import React from 'react';

import Menu from "./Menu";
import Button from "../atoms/Button";

import { connect } from "riddl-js";
import { sortFilter, showAll } from "../riddl/submissions";

const convertDateToMil = date => new Date(date).getTime();

function DataMenu({ sortFilter, showAll, ...props }) {
    return (
        <Menu flex grid>
            <Button onClick={() => showAll()} flex>Show All</Button>
            <Button onClick={() => sortFilter("sortBy", (a, b) => convertDateToMil(a.createdAt) - convertDateToMil(b.createdAt))} flex>Recent</Button>
            <Button onClick={() => sortFilter("sortBy", (a, b) => convertDateToMil(b.createdAt) - convertDateToMil(a.createdAt))}flex>Oldest</Button>
            <Button onClick={() => sortFilter("filterBy", sub => !sub.completed)} flex>Requires Feedback</Button>
            <Button onClick={() => sortFilter("filterBy", sub => sub.completed)} flex>Completed</Button>
        </Menu>
    )
}

export default connect(DataMenu, null, { sortFilter, showAll });
