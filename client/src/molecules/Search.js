import React from 'react';

import FormDisplay from "./FormDisplay";
import { FormContainer } from "atom-lib";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

import { connect } from "riddl-js";
import { handleSearch } from "../riddl/submissions";



export const filterSearch = (sub, searchTerm) => {
    for (let key in sub) {
        if (sub[key] === Object(sub[key])) {
            for (let nestedKey in sub[key]) {
                if (String(sub[key][nestedKey]).toLowerCase().includes(searchTerm)) return true;
            }
        } else {
            if (String(sub[key]).toLowerCase().includes(searchTerm)) return true;
        }
    }
    return false;
}

function Search({ handleSearch, searchTerm }) {
    return (
        <FormContainer
            inputs={{ searchTerm: "" }}
            submit={({ e }) => { e.preventDefault(); handleSearch("") }}
            render={({ handleSubmit }) => (
                <FormDisplay flex onSubmit={handleSubmit}>
                    <Label>
                        <Input onChange={e => handleSearch(e.target.value)} value={searchTerm} search id="search" placeholder="&#x26B2;" />
                    </Label>
                </FormDisplay>
            )}
        />
    )
}

export default connect(Search, state => state.submissions, { handleSearch });