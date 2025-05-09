import React, { useState } from "react";

export default function Profit(props) {
    const { total, quantity } = props;

    // Calculate price per unit
    const pricePerUnit = quantity > 0 ? total / quantity : 0;

    // Initial values for market price and discount issues
    const [marketPrice, setMarketPrice] = useState(350000);
    const [discountIssues, setDiscountIssues] = useState(41000);
    const [operatingCost, setOperatingCost] = useState(10000); // Added operating cost state

    // Calculate profit/loss per unit
    const profitPerUnit =
        marketPrice - pricePerUnit - discountIssues - operatingCost; // Include operating cost

    // Calculate total profit/loss
    const totalProfit = profitPerUnit * quantity;

    // Format number with Vietnamese locale
    const formatNumber = (number) => {
        return number.toLocaleString("vi-VN");
    };

    // Handle input changes
    const handleMarketPriceChange = (e) => {
        const value = e.target.value.replace(/[.,]/g, "");
        setMarketPrice(Number(value));
    };

    const handleDiscountChange = (e) => {
        const value = e.target.value.replace(/[.,]/g, "");
        setDiscountIssues(Number(value));
    };

    const handleOperatingCostChange = (e) => {
        const value = e.target.value.replace(/[.,]/g, "");
        setOperatingCost(Number(value));
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
            <fieldset>
                <legend>Trường hợp</legend>
                <div>
                    <label>Giá thị trường:</label>
                    <input
                        value={formatNumber(marketPrice)}
                        onChange={handleMarketPriceChange}
                    />
                </div>
                <div>
                    <label>Chi phí vận hành (Free ship):</label>
                    <input
                        value={formatNumber(discountIssues)}
                        onChange={handleDiscountChange}
                    />
                </div>
                <div>
                    <label>Chi phí vận hành (Đóng gói)</label>
                    <input
                        value={formatNumber(operatingCost)}
                        onChange={handleOperatingCostChange}
                    />
                </div>
                <div>
                    <label>Lời lỗ trên mỗi máy:</label>
                    <input
                        value={formatNumber(Math.round(profitPerUnit))}
                        readOnly
                        disabled
                    />
                </div>
                <div>
                    <label>Tổng lời lỗ ({quantity} máy):</label>
                    <input
                        value={formatNumber(Math.round(totalProfit))}
                        readOnly
                        disabled
                    />
                </div>
            </fieldset>
        </div>
    );
}
