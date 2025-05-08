import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
    // Giá tiền cho từng loại cước
    const [pricePerUnit, setPricePerUnit] = useState({
        domestic: 15000,
        international: 65000,
        delivery: 5000,
    });

    // Thông tin lô hàng
    const [shipmentInfo, setShipmentInfo] = useState({
        quantity: 26,
        purchasePrice: 4150000,
        domesticShipping: 390000,
        internationalShipping: 1690000,
        deliveryFee: 130000,
    });

    // Tính tổng cộng
    const total =
        shipmentInfo.purchasePrice +
        shipmentInfo.domesticShipping +
        shipmentInfo.internationalShipping +
        shipmentInfo.deliveryFee;

    // Tính toán lại các khoản phí vận chuyển khi giá đơn vị hoặc số lượng thay đổi
    useEffect(() => {
        setShipmentInfo((prev) => ({
            ...prev,
            domesticShipping: pricePerUnit.domestic * prev.quantity,
            internationalShipping: pricePerUnit.international * prev.quantity,
            deliveryFee: pricePerUnit.delivery * prev.quantity,
        }));
    }, [pricePerUnit, shipmentInfo.quantity]);

    // Xử lý thay đổi giá tiền đơn vị
    const handlePricePerUnitChange = (field, value, event) => {
        const input = event.target;
        const cursorPosition = input.selectionStart;
        const oldValue = input.value;
        const newValue = value.replace(/[.,]/g, "");

        // Lưu số lượng dấu chấm trước vị trí con trỏ
        const dotsBeforeCursor = (
            oldValue.slice(0, cursorPosition).match(/\./g) || []
        ).length;

        setPricePerUnit({
            ...pricePerUnit,
            [field]: Number(newValue),
        });

        // Khôi phục vị trí con trỏ sau khi render
        setTimeout(() => {
            const formattedValue = formatNumber(Number(newValue));
            const newDotsBeforeCursor = (
                formattedValue.slice(0, cursorPosition).match(/\./g) || []
            ).length;
            const cursorOffset = newDotsBeforeCursor - dotsBeforeCursor;
            input.setSelectionRange(
                cursorPosition + cursorOffset,
                cursorPosition + cursorOffset
            );
        }, 0);
    };

    // Xử lý thay đổi thông tin lô hàng
    const handleShipmentChange = (field, value, event) => {
        const input = event.target;
        const cursorPosition = input.selectionStart;
        const oldValue = input.value;
        const newValue = value.replace(/[.,]/g, "");

        // Lưu số lượng dấu chấm trước vị trí con trỏ
        const dotsBeforeCursor = (
            oldValue.slice(0, cursorPosition).match(/\./g) || []
        ).length;

        setShipmentInfo({
            ...shipmentInfo,
            [field]: Number(newValue),
        });

        // Khôi phục vị trí con trỏ sau khi render
        setTimeout(() => {
            const formattedValue = formatNumber(Number(newValue));
            const newDotsBeforeCursor = (
                formattedValue.slice(0, cursorPosition).match(/\./g) || []
            ).length;
            const cursorOffset = newDotsBeforeCursor - dotsBeforeCursor;
            input.setSelectionRange(
                cursorPosition + cursorOffset,
                cursorPosition + cursorOffset
            );
        }, 0);
    };

    // Format số thành dạng có dấu chấm
    const formatNumber = (number) => {
        return number.toLocaleString("vi-VN");
    };

    return (
        <div className="App">
            <h2>Tính Toán</h2>

            {/* Nhóm Giá tiền cho từng loại cước */}
            <fieldset
                style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    marginBottom: "1rem",
                }}
            >
                <legend style={{ padding: "0 0.5rem" }}>
                    Giá tiền từng loại cước cho một máy
                </legend>

                <div>
                    <label>
                        Giá tiền cho [Cước vận chuyển nội địa nhật bản]:
                    </label>
                    <input
                        value={formatNumber(pricePerUnit.domestic)}
                        onChange={(e) =>
                            handlePricePerUnitChange(
                                "domestic",
                                e.target.value,
                                e
                            )
                        }
                    />
                </div>
                <div>
                    <label>
                        Giá tiền cho [Cước vận chuyển quốc tế (bằng đường biển -
                        HCM)]:
                    </label>
                    <input
                        value={formatNumber(pricePerUnit.international)}
                        onChange={(e) =>
                            handlePricePerUnitChange(
                                "international",
                                e.target.value,
                                e
                            )
                        }
                    />
                </div>
                <div>
                    <label>Giá tiền cho [Cước vận chuyển đến tận tay]:</label>
                    <input
                        value={formatNumber(pricePerUnit.delivery)}
                        onChange={(e) =>
                            handlePricePerUnitChange(
                                "delivery",
                                e.target.value,
                                e
                            )
                        }
                    />
                </div>
            </fieldset>

            {/* Nhóm Thông tin lô hàng */}
            <fieldset
                style={{
                    border: "1px solid #ccc",
                    padding: "1rem",
                    marginBottom: "1rem",
                }}
            >
                <legend style={{ padding: "0 0.5rem" }}>
                    Thông tin lô hàng
                </legend>

                <div>
                    <label>Số lượng máy của lô hàng:</label>
                    <input
                        value={formatNumber(shipmentInfo.quantity)}
                        onChange={(e) =>
                            handleShipmentChange("quantity", e.target.value, e)
                        }
                    />
                </div>
                <div>
                    <label>Phí mua lô hàng:</label>
                    <input
                        value={formatNumber(shipmentInfo.purchasePrice)}
                        onChange={(e) =>
                            handleShipmentChange(
                                "purchasePrice",
                                e.target.value,
                                e
                            )
                        }
                    />
                </div>
                <div>
                    <label>Cước vận chuyển nội địa nhật bản:</label>
                    <input
                        value={formatNumber(shipmentInfo.domesticShipping)}
                        onChange={(e) =>
                            handleShipmentChange(
                                "domesticShipping",
                                e.target.value,
                                e
                            )
                        }
                    />
                </div>
                <div>
                    <label>
                        Cước vận chuyển quốc tế (bằng đường biển - HCM):
                    </label>
                    <input
                        value={formatNumber(shipmentInfo.internationalShipping)}
                        onChange={(e) =>
                            handleShipmentChange(
                                "internationalShipping",
                                e.target.value,
                                e
                            )
                        }
                    />
                </div>
                <div>
                    <label>Cước vận chuyển đến tận tay:</label>
                    <input
                        value={formatNumber(shipmentInfo.deliveryFee)}
                        onChange={(e) =>
                            handleShipmentChange(
                                "deliveryFee",
                                e.target.value,
                                e
                            )
                        }
                    />
                </div>
            </fieldset>

            {/* Nhóm Tổng kết */}
            <fieldset style={{ border: "1px solid #ccc", padding: "1rem" }}>
                <legend style={{ padding: "0 0.5rem" }}>Tổng cộng</legend>

                <div>
                    <label>Tổng hết khi về tay:</label>
                    <input value={formatNumber(total)} readOnly />
                </div>
            </fieldset>
        </div>
    );
}

export default App;
