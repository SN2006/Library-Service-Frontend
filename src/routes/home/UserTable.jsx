import {Table} from "antd";
import {useEffect, useState} from "react";
import {request} from "../../util/axios_helper.js";

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        minWidth: "5vw",
    },
    {
        title: "First Name",
        dataIndex: "firstName",
        minWidth: "20vw",
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        minWidth: "20vw",
    },
    {
        title: "Email",
        dataIndex: "email",
        minWidth: "20vw",
    }
];

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        request(
            "GET",
            "/users",
            {},
            {},
            {}
        ).then((res) => {
            setUsers(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return <Table
        style={{
            marginTop: 20,
        }}
        dataSource={users}
        columns={columns}
        bordered
        title={() => "Users"}
        pagination={false}
    >

    </Table>
}

export default UserTable;