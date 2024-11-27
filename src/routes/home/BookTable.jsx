import {Table} from "antd";
import {useEffect, useState} from "react";
import {request} from "../../util/axios_helper.js";

const columns = [
    {
        title: "Title",
        dataIndex: "title",
        render: (text) => <a href={`/books/${text[1]}`}>{text[0]}</a>,
        minWidth: "20vw",
    },
    {
        title: "Page Number",
        dataIndex: "pageNumber",
        minWidth: "20vw",
    },
    {
        title: "Year",
        dataIndex: "year",
        minWidth: "20vw",
    }
];

const BookTable = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        request(
            "GET",
            "/books",
            {},
            {},
            {}
        ).then((res) => {
            setBooks(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const data = books.map((book) => (
        {
            title: [book.title, book.id],
            pageNumber: book.pageNumber,
            year: book.year,
        }
    ))

    return <Table
        style={{
            marginTop: 20,
        }}
        dataSource={data}
        columns={columns}
        bordered
        title={() => "Books"}
        pagination={false}
    >

    </Table>
}

export default BookTable;