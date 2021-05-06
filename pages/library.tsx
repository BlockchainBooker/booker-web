import MyBooks from "components/MyBooks";
import Layout from "components/ui/Layout";
import React from "react";

const MyBooksPage = () => {
    return (
        <Layout>
            <div style={{ padding: 30 }}>
                <h1>My books</h1>
                <MyBooks />
            </div>
        </Layout>

    );
};

export default MyBooksPage;
