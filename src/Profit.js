import React from "react";

export default function Profit(props) {
    const { total, quantity } = props;

    // Calculate price per unit
    const pricePerUnit = quantity > 0 ? total / quantity : 0;

    // Format number with Vietnamese locale
    const formatNumber = (number) => {
        return number.toLocaleString("vi-VN");
    };

    return (
        <div>
            <div>
                <label>Giá mỗi máy khi về tay:</label>
                <input
                    value={formatNumber(Math.round(pricePerUnit))}
                    disabled
                    readOnly
                />
            </div>
        </div>
    );
}
