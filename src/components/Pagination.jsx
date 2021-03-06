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
const pageSizeArr=["20", "30", "50"];

export const PaginationMy = ({totalForPages, page, pageSize, pageChange, pageSizeChange}) => {
    return (
        <Pagination total={totalForPages}
                    current={page}
                    pageSize={pageSize}
                    pageSizeOptions={pageSizeArr}
                    showSizeChanger
                    showQuickJumper
                    onChange={pageChange}
            // onShowSizeChange={pageSizeChange}
                    itemRender={itemRender}/>
    )
};
