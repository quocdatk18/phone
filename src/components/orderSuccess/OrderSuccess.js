import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router';

export default function OrderSuccess() {
    const navigate = useNavigate()
    const back = () => {
        navigate('/')
        window.location.reload()
    }
    return (
        <div>
            <Result
                status="success"
                title="Đặt hàng thành công!"
                subTitle="Xin cảm ơn quý khách đã chọn dịch vụ của chúng tôi"
                extra={[
                    <Button type="primary" key="console" onClick={back}>
                        Về trang chủ
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                ]}
            />,

        </div>
    )
}
