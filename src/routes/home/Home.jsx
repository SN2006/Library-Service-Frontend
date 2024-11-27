import {Flex, Menu} from "antd";
import MenuItem from "antd/es/menu/MenuItem.js";
import {useEffect, useState} from "react";
import {request, setAuthToken} from "../../util/axios_helper.js";

const Home = () => {
    const [user, setUser] = useState({});

    const items = [
        {
            label: "Books",
            key: "books",
        },
        {
            label: "Add Book",
            key: "add_book",
        },
        {
            label: "Logout",
            key: "logout",
        }
    ]

    const onClickTabItem = (item) => {
        if (item.key === "logout") {
            setAuthToken(null);
            document.location.reload();
        }
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
    })

    return <Flex vertical={true} align="center">
        <Menu
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            mode="horizontal"
            items={items}
            onClick={onClickTabItem}
        >
        </Menu>
    </Flex>
}

export default Home;