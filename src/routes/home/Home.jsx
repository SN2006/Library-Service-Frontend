import {Flex, Menu} from "antd";
import {useEffect, useState} from "react";
import {request, setAuthToken} from "../../util/axios_helper.js";
import BookTable from "./BookTable.jsx";
import AddBookForm from "./AddBookForm.jsx";

const BOOKS_KEY = "books";
const ADD_BOOK_KEY = "add_book";
const ADD_USER_KEY = "add_user";
const LOGOUT_KEY = "logout";

const userItems = [
    {
        label: "Books",
        key: BOOKS_KEY,
    },
    {
        label: "Add Book",
        key: ADD_BOOK_KEY,
    },
    {
        label: "Logout",
        key: LOGOUT_KEY,
    }
];

const adminItems = [
    {
        label: "Books",
        key: BOOKS_KEY,
    },
    {
        label: "Add Book",
        key: ADD_BOOK_KEY,
    },
    {
        label: "Add User",
        key: ADD_USER_KEY,
    },
    {
        label: "Logout",
        key: LOGOUT_KEY,
    }
];

const Home = () => {
    const [user, setUser] = useState({});
    const [currentState, setCurrentState] = useState(BOOKS_KEY)

    const onClickTabItem = (item) => {
        if (item.key === LOGOUT_KEY) {
            setAuthToken(null);
            document.location.reload();
        }else{
            setCurrentState(item.key);
        }
    }

    const onReturnToBooks = () => {
        setCurrentState(BOOKS_KEY)
    }

    useEffect(() => {
        request(
            "GET",
            "/users/current",
            {},
            {},
            {}
        ).then((res) => {
            setUser(res.data);
        }).catch((err) => {
            if (err.status === 401 || err.status === 403) {
                document.location.href = "/login";
            }
        })
    }, [])

    return <Flex vertical={true} align="center">
        <Menu
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            mode="horizontal"
            items={user.role === "ADMIN" ? adminItems : userItems}
            onClick={onClickTabItem}
            defaultSelectedKeys={["books"]}
            selectedKeys={[currentState]}
        >
        </Menu>
        {currentState === BOOKS_KEY && <BookTable />}
        {currentState === ADD_BOOK_KEY && <AddBookForm user={user} onReturn={onReturnToBooks} />}
    </Flex>
}

export default Home;