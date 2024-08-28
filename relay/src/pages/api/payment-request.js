export default function handler(req, res) {
    res.status(200).json({
        qrcode: "0002010102121531279404962794049600240812239958227540014A00000084300010108TDBMMNUB02200000000000041902893652045651530349654062857805802MN5914SHOPPYMERCHANT6011ULAANBAATAR62250721Wgtk4zI627ygLeSxnYw4q7106QPP_QR781505651210249086079022280020163047C94",
        amount: Math.floor(Math.random() * 100) + 1,
        from: `User${Math.floor(Math.random() * 1000)}`,
    });
}
