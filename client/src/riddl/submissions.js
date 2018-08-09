const submissions = {
    data: [],
    loading: true,
    err: null,
    filterBy: (sub) => !sub.completed,
    sortBy: (a, b) => -1,
    searchTerm: ""
}

const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
};

const handleErrors = response => {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
}

export const getSubmissions = () => setGlobalState => (
    fetch("/api/submissions", config)
        .then(handleErrors)
        .then(data => setGlobalState(prevState => ({
            submissions: {
                ...prevState.submissions,
                data,
                loading: false,
                err: null
            }
        })))
        .catch(err => setGlobalState(prevState => ({
            submissions: {
                ...prevState.submissions,
                data: [],
                loading: false,
                err: err.message
            }
        })))
)

export const markStatus = (id, status) => setGlobalState => {
    fetch("/api/submissions/" + id, {
        method: "PUT",
        body: JSON.stringify({ completed: status }),
        ...config
    })
        .then(handleErrors)
        .then(data => setGlobalState(prevState => ({
            submissions: {
                ...prevState.submissions,
                data: prevState.submissions.data.map(sub => sub._id === id ? data : sub),
                err: null,
                loading: false
            }
        })))
        .catch(err => setGlobalState(prevState => ({
            submissions: {
                ...prevState.submissions,
                data: [],
                loading: false,
                err: err.message
            }
        })))
}

export const sortFilter = (name, cb) => setGlobalState => {
    setGlobalState(prevState => ({
        submissions: {
            ...prevState.submissions,
            [name]: cb
        }
    }))
}

export const showAll = () => setGlobalState => {
    setGlobalState(prevState => ({
        submissions: {
            ...prevState.submissions,
            filterBy: (sub) => true,
            sortBy: (a, b) => -1,
            searchTerm: ""
        }
    }))
}

export const handleSearch = searchTerm => setGlobalState => {
    setGlobalState(prevState => ({
        submissions: {
            ...prevState.submissions,
            filterBy: (sub) => true,
            searchTerm: searchTerm.toLowerCase()
        }
    }))
}

export default submissions;