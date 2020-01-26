import React from 'react';
import 'antd/dist/antd.css';
import '../style/index.css';
import {Pagination} from 'antd';

function itemRender(current, type, originalElement) {
    if (type === 'prev') {
        return <a>Previous</a>;
    }
    if (type === 'next') {
        return <a>Next</a>;
    }
    return originalElement;
}

export const PaginationMy = ({totalForPages, page, pageChange, pageSizeChange}) => {
    return (
        <Pagination total={totalForPages}
                    current={page}
                    pageSizeOptions={["10", "20", "50"]}
                    showSizeChanger
                    showQuickJumper
                    onChange={pageChange}
                    onShowSizeChange={pageSizeChange} itemRender={itemRender}/>
    )
};
