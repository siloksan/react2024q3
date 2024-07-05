import React from 'react';
import Header from 'widgets/header';

import styles from './Layout.module.scss';
import Main from "pages/main";

export default Routes() {
    const element = useRoutes([
        { path: "/", element: <Home/> },
        { path: "/posts",
            element: <Posts/>,
            children: [
                { index: true, element: <PostLists/> },
                { path: ":slug", element: <Post/> }
            ],
        },
        { path: "/about", element: <About/> },
        { path: "*", element: <NoMatch/>}
    ]);
    return element;
}
